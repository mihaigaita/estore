import { createSlice, createSelector } from 'redux-starter-kit';
import productsSlice from './products';
import { filterRSAAByTypeFactory } from '../actions';
const {
  removeTagHelper,
  removeProductFromAllTagsHelper,
  addOrUpdateTagHelper,
  addProductToTagHelper
} = require('../other/dbLayer.js');


// Note: think of tags as categories or labels
// which allow us to specify collections of products

// Reducers which update state immutably via immer 
// proxy object (under the hood of createSlice):

// Update forward and reverse Tag <-> Product Lookups
let addOrUpdateTag = (draftTagLookupState, action) => {
  let { name, productIdList } = action.payload;
  addOrUpdateTagHelper(draftTagLookupState, name, productIdList);
};

// Remove Tag entirely
let removeTag = (draftTagLookupState, action) => {
  removeTagHelper(draftTagLookupState, action.payload.tagId)
};

// Add a new product to a Tag
let addProductToTag = (draftTagLookupState, action) => {
  let { tagId, productId } = action.payload;
  addProductToTagHelper(draftTagLookupState, tagId, productId);
};

// Remove a product id from the specified Tag
let removeProductFromAllTags = (draftTagLookupState, action) => {
  removeProductFromAllTagsHelper(draftTagLookupState, action.payload.productId);
};

// Add a list of tags all at once
let addTags = (draftTagLookupState, action) => {
  let tagEntries = action.payload;
  tagEntries.forEach(([tagId, tagData]) => {
    let  { name, productIdList } = tagData;
    addOrUpdateTagHelper(draftTagLookupState, name, productIdList, tagId);
  });
};

const tagsSlice = createSlice({
  slice: 'tagsLookup',
  initialState: {
    mapTagsToProducts: {},
    mapProductsToTags: {}
  },
  reducers: {
    addOrUpdateTag,  // payload: { name, productIdList }
    removeTag        // payload: { tagId }
  },
  extraReducers: {
    [productsSlice.actions.addOrUpdateProduct]: addProductToTag,
    [productsSlice.actions.removeProduct]: removeProductFromAllTags,

    // payload: { [tagEntry: [tagId, tagData: {name, productIdList}] ] }
    'success': filterRSAAByTypeFactory(addTags, 'getTags') 
  }
})


// Selectors which retrive tag data from state

let { getTagsLookup } = tagsSlice.selectors;
let { getProductsHashById } = productsSlice.selectors;
let getTagId = (_, props) => props.tagId;

export const getProductIdListAndName = createSelector(
  [getTagsLookup, getProductsHashById, getTagId],
  (tagsLookup, productsHashById, tagId) => {
    let tagObj = tagsLookup.mapTagsToProducts[tagId];
    let productIdList, title;

    if (tagObj) {
      productIdList = tagObj.productIdList;
      title = tagObj.name;
    } else {
      // If the tagId is not specified 
      // we provide the id of all products
      productIdList = Object.keys(productsHashById);
      title = 'All products'
    }

    return {title, productIdList};
  }
);

export const getTagIdList = createSelector(
  [getTagsLookup],
  (tagsLookup) => Object.keys(tagsLookup.mapTagsToProducts)
);

export default tagsSlice;