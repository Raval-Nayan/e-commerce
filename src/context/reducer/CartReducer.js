import { json } from "react-router-dom";

const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CART":
      const { id, color, product, amount } = action.payload;

      let cartProduct;

      cartProduct = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.image[0].url,
        price: product.price,
        max: product.stock,
      };

      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };

    case "REMOVE_CART":
      console.log(action.payload);
      let CartData = state.cart.filter((cur) => {
        return cur.id !== action.payload;
      });
      return {
        ...state,
        cart: CartData,
      };

      case "CLEAR_ALL_FILTER_CART":
         return{
            ...state,
            cart:[],
         }
     
    default:
      return state;
  }
};

export default CartReducer;
