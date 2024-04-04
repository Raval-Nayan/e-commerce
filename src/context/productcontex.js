import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer/productReducer";

const AppContext = createContext();
const API = "https://api.pujakaitem.com/api/products";

const AppProvider = ({ children }) => {


  const initialState= {
    isLoading:false,
    isError:false,
    featureProduct:[],
    products:[],
    singleproduct:{},

  }
const [state,dispatch]=useReducer(reducer,initialState)

  const getProduct = async (url) => {
    dispatch({type:"SET_LOADING"})
  try {
      const res = await axios.get(url);
      const products = await res.data;
      console.log(products);
      dispatch({type:"SET_FEATURE_PRODUCT" , payload:products})
  } catch (error) {
    dispatch({type:"API_ERROR"})
  }
  };

  const getSingleProduct = async (url) => {
    dispatch({type:"SET_LOADING"})
  try {
      const res = await axios.get(url);
      const singleproducts = await res.data;
      console.log(singleproducts,"singleproduct");
      dispatch({type:"SET_SINGLE_PRODUCT" , payload:singleproducts})
  } catch (error) {
    dispatch({type:"API_ERROR"})
  }
  };

  useEffect(() => {
    getProduct(API);
  }, []);

  return (
    <AppContext.Provider value={{...state,getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
