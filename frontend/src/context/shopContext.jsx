import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const addToCart = async (itemID, size) => {
    if (!size) {
      toast.error("Select Product size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemID]) {
      if (cartData[itemID][size]) {
        cartData[itemID][size] += 1;
      } else {
        cartData[itemID][size] = 1;
      }
    } else {
      cartData[itemID] = {};
      cartData[itemID][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId: itemID, size },
          { headers: { token } },
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemID, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (!cartData[itemID]) {
      return;
    }

    if (quantity <= 0) {
      delete cartData[itemID][size];
      if (Object.keys(cartData[itemID]).length === 0) {
        delete cartData[itemID];
      }
    } else {
      cartData[itemID][size] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId: itemID, size, quantity },
          { headers: { token } },
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  const getCartAmount = () => {
    let TotalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (!itemInfo) continue
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            TotalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return TotalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const addReview = async (productId, rating, comment) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/review/add",
        { productId, rating, comment },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await getProductsData(); // Refresh products to update ratings
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      return false;
    }
  };

  const getProductReviews = async (productId) => {
    try {
      const response = await axios.get(`${backendUrl}/api/review/product/${productId}`);
      if (response.data.success) {
        return response.data;
      } else {
        toast.error(response.data.message);
        return null;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      return null;
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } },
      );
      if (response.data.cartData) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem('token'))
    }
  });

  const value = {
    products,
    currency,
    delivery_fee,
    setToken,
    token,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setCartItems,
    addReview,
    getProductReviews,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
