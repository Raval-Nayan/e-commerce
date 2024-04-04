import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "../productcontex";
import reducer from "./FilterReducer";
import { User } from "@auth0/auth0-react";
import Products from "../../Products";

const FilterContex = createContext();

const intialstate = {
  grid_view: true,
  filter_products: [],
  all_products: [],
  sort_Value: "higher",
  filters:{
    Search_text:"",
    category: "all",
    company:"all",
    color:"all",
    maxPrice: 0,
    price: 0,
    minPrice: 0,


  }
};

const FilterProvider = ({ children }) => {
  const { products } = useProductContext();

  const [state, dispatch] = useReducer(reducer, intialstate);

  const setGridview = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };

  const setListview = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };

  const sortfunction = (event) => {
    const User_Value = event.target.value;

    dispatch({ type: "DROPDOWN_SORT_DATA", payload: User_Value });
    console.log(User_Value, "uservalue");
  };

  const updateFilterValue=(e)=>{
    const value=e.target.value;
    const name= e.target.name;
console.log(name,value,"lllllllllllllllllll")
    dispatch({type:"UPDATE_SEARCH_DATA_SET_VALUE", payload:{name,value}})
  }

  const clearFilter=()=>{
    dispatch({type:"ALL_FILTER_ARE_CLEAR"})
  }

  useEffect(() => {
    console.log("useEffect chali")
    dispatch({type:"FILTER_SEARCH_PRODUCTS"})
    dispatch({ type: "SORTING_PRODUCTS", payload: Products });
  
  }, [products,state.sort_Value,state.filters]);

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContex.Provider
      value={{ ...state, setGridview, setListview, sortfunction,updateFilterValue ,clearFilter}}
    >
      {children}
    </FilterContex.Provider>
  );
};

const useFilterContex = () => {
  return useContext(FilterContex);
};

export { FilterContex, useFilterContex, FilterProvider };
