import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets"
import { toast } from "react-toastify";

export const shopContext = createContext();

const shopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [search, setSearch] = useState('')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showSearch, setShowSearch] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cartItems, setCartItems] = useState({});


    const addToCart = async (itemID, size)=> {

        if(!size) {
            toast.error('Select Product size')
            return 
        }

        let cartData = structuredClone(cartItems);

        if(cartData[itemID]){
            if(cartData[itemID][size]){
                cartData[itemID][size] +=1;
            }
            else{
                cartData[itemID][size] =1;
            }
        }
        else{
            cartData[itemID] = {};
            cartData[itemID][size] = 1;
        }
        setCartItems(cartData)

    }

    const getCartCount = () =>{
        let totalCount = 0;
        for (const items in cartItems){
            for(const item in cartItems[items]){
                try{

                    if(cartItems[items][item] > 0 ){
                        totalCount += cartItems[items][item];
                    }

                }catch(error){
                    console.log(error);
                    
                }
            }
        } 
        return totalCount;
    }

    const updateQuantity = async (itemID, size, quantity)=>{
        let cartData = structuredClone(cartItems);

        cartData[itemID][size] = quantity;

        setCartItems(cartData); 

    }

    const value = {

        products, currency, delivery_fee, search, setSearch, showSearch,setShowSearch, cartItems, addToCart, getCartCount, updateQuantity
    }

    return(
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )

}
export default shopContextProvider
