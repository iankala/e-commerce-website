import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'
import axios from 'axios'

//global variables
const currency = 'usd'
const deliveryCharge = 10

//GATEWAI INITIALIZE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// M-Pesa token helper
const getMpesaToken = async () => {
    const auth = Buffer.from(
        `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString('base64')

    const response = await axios.get(
        'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        { headers: { Authorization: `Basic ${auth}` } }
    )
    return response.data.access_token
}

//placing orders using COD Method
const placeOrder = async (req, res)=> {
    try{
        const {userId, items, amount, address} = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, {cartData:{}})
        res.json({success:true, message: "Oder Placed"})

    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
        

    }
}
//placing orders using stripe Method
const placeOrderStripe = async (req, res)=> {
    try{
         const {userId, items, amount, address} = req.body
         const {origin} = req.headers;

          const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"stripe",
            payment:false,
            date:Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item)=>({
            price_data : {
                currency: currency,
                product_data:{
                    name:item.name
                },
                unit_amount: item.price*100
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data : {
                currency: currency,
                product_data:{
                    name:'Delivery Charges'
                },
                unit_amount: deliveryCharge *100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url : `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
        })

        res.json({sucess:true, session_url:session.url})
    }
    catch(error){
         console.log(error);
        res.json({success:false, message:error.message})
        

    }
}

//verify Stripe
const  verifyStripe = async(req, res)=>{
    const {orderId, success, userId } = req.body

    try{
        if (success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success: true});
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }

    }catch(error){
         console.log(error);
        res.json({success:false, message:error.message})
        
    }
}

//placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res)=> {
    try{
        
    }catch(error){

    }
}
// placing orders using M-Pesa
const placeOrderMpesa = async (req, res) => {
    try {
        const { userId, items, amount, address, phone } = req.body

        const orderData = {
            userId, items, amount, address,
            paymentMethod: "Mpesa",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const token = await getMpesaToken()

        const timestamp = new Date().toISOString()
            .replace(/[-T:.Z]/g, '').slice(0, 14)
        const password = Buffer.from(
            `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
        ).toString('base64')

        const stkResponse = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            {
                BusinessShortCode: process.env.MPESA_SHORTCODE,
                Password: password,
                Timestamp: timestamp,
                TransactionType: 'CustomerPayBillOnline',
                Amount: Math.ceil(amount),
                PartyA: phone,
                PartyB: process.env.MPESA_SHORTCODE,
                PhoneNumber: phone,
                CallBackURL: process.env.MPESA_CALLBACK_URL,
                AccountReference: newOrder._id.toString(),
                TransactionDesc: 'DRIPPED Order Payment'
            },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        res.json({ success: true, orderId: newOrder._id, data: stkResponse.data })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// M-Pesa callback — Safaricom calls this after payment
const mpesaCallback = async (req, res) => {
    try {
        const { Body } = req.body
        const resultCode = Body.stkCallback.ResultCode

        if (resultCode === 0) {
            const orderId = Body.stkCallback.CallbackMetadata.Item
                .find(i => i.Name === 'AccountReference').Value
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(
                (await orderModel.findById(orderId)).userId,
                { cartData: {} }
            )
        }
        res.json({ success: true })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// All orders data for Admin panel
const allOrders = async (req, res)=> {
    try{
        const orders = await orderModel.find({})
        res.json({success:true, orders})
    }catch(error){
        console.log(error);
        res.json({success:false, message: error.message})
    }
}
// User order data for frontend
const userOrders = async (req, res)=> {
    try{
        const {userId} = req.body

        const orders = await orderModel.find({userId})
        res.json({success:true, orders})

    }catch(error){
        console.log(error);
        res.json({success:false, message: error.message})
        
    }
}
// update orders status from Admin panel
const updateStatus = async (req, res)=> {
    try{
        const {orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true, message: 'status updated'})

    }catch(error){
        console.log(error);
        res.json({success:false, message: error.message})
        
    }
}

export {verifyStripe,mpesaCallback,placeOrderMpesa, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}