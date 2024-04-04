const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_FEATURE_PRODUCT":
      const featureData = action.payload.filter((cur) => {
        return cur.featured === true;
      });

      console.log(featureData,"featureproduct");

      return {
        ...state,
        isLoading: false,
        isError: false,
        featureProduct: featureData,
        products: action.payload,
      };

      case "SET_SINGLE_PRODUCT":
       
  
        return {
          ...state,
          isLoading: false,
          isError: false,
         
          singleproduct: action.payload,
        };


      case "API_ERROR":
      return{
        ...state,
        isLoading: false,
        isError: true,
      }

      case "SET_LOADING":
        return{
            ...state,
          isLoading:true,
          isError: true,
        }
  

    default:
      return state;
  }
};

export default ProductReducer;
