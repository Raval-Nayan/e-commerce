import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./CartReducer";

const cartContext = createContext();

const getLocalCartData = () => {
  let newCartData = localStorage.getItem("cardData");

  if ( !newCartData){
    return [];
  } else {
    return JSON.parse(newCartData);
  }
};

const intialstate = {
  cart:getLocalCartData(),
  total_item: "",
  total_amount: "",
  shipping_fee: 50000,
};
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialstate);

  const addcart=(id,color,product,amount)=>{

    dispatch({type:"ADD_CART" , payload :{id,color, product,amount}})
  }

  const deleteCart=(id)=>{
    dispatch({type:"REMOVE_CART",payload:id})
  }

  const clearFilterCart=()=>{
    console.log("its work")
    dispatch({type:"CLEAR_ALL_FILTER_CART"})
  }

  useEffect(()=>{
    

    localStorage.setItem("cardData",JSON.stringify(state.cart))
    
   
   
  },[state.cart])

  return (
    <cartContext.Provider value={{ ...state,addcart,deleteCart,clearFilterCart }}>{children}</cartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(cartContext);
};

export { useCartContext, CartProvider };
