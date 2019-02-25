import { createSlice } from 'redux-starter-kit';
import { filterRSAAByTypeFactory } from '../actions';
const { 
  removeProductHelper,
  addOrUpdateProductHelper,
  addProductsHelper
} = require('../other/dbLayer');


// Reducers which update state immutably via immer 
// proxy object (under the hood of createSlice):

let addOrUpdateProduct = (draftProductHashState, action) => {
  let { productId, productData } = action.payload;
  addOrUpdateProductHelper(draftProductHashState, productId, productData);
};

let addProducts = (draftProductHashState, action) => {
    addProductsHelper(draftProductHashState, action.payload)
};

let removeProduct = (draftProductHashState, action) => {
  removeProductHelper(draftProductHashState, action.payload.productId);
};

const productsSlice = createSlice({
  slice: 'productsHashById',
  initialState: {},
  reducers: {
    addProducts,        // payload: { productList[{ productId, productData: {title, ratingInStars, price, imageURL}, tagId}]}
    addOrUpdateProduct, // payload: { productId, productData: {title, ratingInStars, price, imageURL}, tagId }
    removeProduct       // payload: { productId }
  },
  extraReducers: {
    // payload: { [ [productId, productData: {...}] ] }
    'success': filterRSAAByTypeFactory(addProducts, 'getProducts')
  }
});

// Selectors which retrive product data from state

let { getProductsHashById } = productsSlice.selectors;

// No need to add memoization to a object which is a hash
export const getProductData = (state, ownProps) => {
  return getProductsHashById(state)[ownProps.productId];
};

export default productsSlice;