import express from 'express'
import authUser from '../middleware/auth.js'

import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe} from '../controllers/orderController.js'

import adminAuth from '../middleware/adminauth.js'

const orderRouter = express.Router()

orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

//payment Features

orderRouter.post('/place',authUser, placeOrder)
orderRouter.post('/stripe',authUser, placeOrderStripe)
orderRouter.post('/razorpay',authUser, placeOrderRazorpay)

//user Feature
orderRouter.post('/userorders',authUser, userOrders)

//verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)

export default orderRouter

