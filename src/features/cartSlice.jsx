import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const isAdded = state.cart.find(item => item.id === action.payload.id)
      if(isAdded) {
        alert("Product already added");
        return;
      };
      state.cart.push(action.payload);
    },
    removeProductFromCart: (state, action) => {
     state.cart = state.cart.filter((product) => product.id !== action.payload);
    },
    incProduct: (state, action) => {
      const product = state.cart.find(item => item.id === action.payload);
      if(product){
        product.quantity += 1;
      }
    },
    decProduct: (state, action) => {
      const product = state.cart.find(item => item.id === action.payload);
      if(product && product.quantity > 1){
        product.quantity -= 1;
      } else if (product){
        state.cart = state.cart.filter((product) => product.id !== action.payload);
      }
    }
  },
});

export const { addProductToCart, removeProductFromCart, incProduct, decProduct} = cartSlice.actions;
export default cartSlice.reducer;
