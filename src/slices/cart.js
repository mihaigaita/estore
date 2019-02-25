import { createSlice, createSelector } from 'redux-starter-kit';
import { enumListToObject } from '../other/helpers';
import productsSlice from './products';

// Common functions
const MODE = enumListToObject(["INCR", "DECR", "ABS"]);

let updateQuantityByMode = (currentQuantity = 0, value = 0, mode) => {
  switch (mode) {
    case MODE.INCR: return currentQuantity + value;
    case MODE.DECR: return currentQuantity - value;
    default /* MODE.ABS */: return value;
  }
};

let adjustQuantity = (cartContents, 
                      productId, 
                      deltaValue = 1, 
                      mode = MODE.INCR) => {

  if (!cartContents || !productId) return;
  let cartEntry = cartContents.find(element => element.productId === productId);

  // If the product is already in the cart we only update its quantity
  if (cartEntry) {
    let entryIndex = cartContents.indexOf(cartEntry);
    let newQuantity = updateQuantityByMode(cartEntry.quantity, deltaValue, mode);

    // We only add to cart positive quantities
    if (newQuantity > 0) {
      cartContents[entryIndex] = {
        productId: productId,
        quantity: newQuantity
      };
    } else { // Remove product entirely if it has negative quantity
      cartContents.splice(entryIndex, 1);
    }
  } else { 
    let newQuantity = updateQuantityByMode(0, deltaValue, mode);

    // If product is not in cart we only consider positive quantities 
    if (newQuantity > 0) { 
      cartContents.push({
        productId: productId,
        quantity: deltaValue
      });
    }
  }
};

// Reducers which update state immutably via immer 
// proxy object (under the hood of createSlice):

let incrQuantity = (draftCartState, action) => {
  adjustQuantity(draftCartState, action.payload.productId, 1, MODE.INCR);
};

let decrQuantity = (draftCartState, action) => {
  adjustQuantity(draftCartState, action.payload.productId, 1, MODE.DECR);
};

let setQuantity = (draftCartState, action) => {
  adjustQuantity(
    draftCartState,
    action.payload.productId,
    action.payload.quantity,
    MODE.ABS
  );
};

let remove = (draftCartState, action) => {
  adjustQuantity(draftCartState, action.payload.productId, 0, MODE.ABS);
};

const cartSlice = createSlice({
  slice: 'productsInCart',
  initialState: [],
  reducers: {
    incrQuantity, // payload: { productId }
    decrQuantity, // payload: { productId }
    setQuantity,  // payload: { productId, newQuantity }
    remove        // payload: { productId }
  }
})


// Selectors which retrieve cart data from the store

let { getProductsInCart } = cartSlice.selectors;
let { getProductsHashById } = productsSlice.selectors;

// This is a selector factory, parameterized by productId
export const makeGetQuantity = (productId) => {
  let getQuantity = createSelector(
    [getProductsInCart],
    (productsInCart) => {

      let cartEntry = productsInCart.find(element => {
        return (element.productId === productId);
      });
      return cartEntry.quantity;
    }
  );
  return getQuantity;
}

export const getCartTotal = createSelector(
  [getProductsInCart, getProductsHashById],
  (productsInCart, productsHashById) => {

    let cartTotal = productsInCart.reduce((sum, {productId, quantity}) => {
      let productObj = productsHashById[productId];
      return sum + productObj.price * quantity;
    }, 0);

    return cartTotal;
  }
);

export const getProductIdsInCart = createSelector(
  [getProductsInCart],
  (productsInCart) => productsInCart.map(element => element.productId)
);

export default cartSlice;