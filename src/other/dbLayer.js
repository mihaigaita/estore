exports.getTagList = (database) => {
  return Object.entries(database.tagsLookup.mapTagsToProducts);
};

// Update forward and reverse Tag <-> Product Lookups
exports.addOrUpdateTagHelper = (
  tagLookup, 
  tagName, 
  productIdListToAdd, 
  tagId = null,
  idGenerator = () => Date.now().toString()
) => {
  let { mapTagsToProducts } = tagLookup;
  let finalTagId;
  
  if (tagId) {
    finalTagId = tagId;
  } else {
    let existingTagId = null;

    for (let tagId of Object.keys(mapTagsToProducts)) {
      if (mapTagsToProducts[tagId].name === tagName) {
        existingTagId = tagId;
        break;
      }
    }

    // If the tag already exists reuse it, otherwise create a new one
    finalTagId =  existingTagId || idGenerator();
  }

  // Add or update the forward lookup TagId -> ProductId[]
  mapTagsToProducts[finalTagId] = {
    name: tagName,
    productIdList: productIdListToAdd
  };

  // Add or update the reverse lookup ProductId -> TagId[]
  let { mapProductsToTags } = tagLookup;
  productIdListToAdd.forEach(productId => {
    if (mapProductsToTags[productId]) {
      if (mapProductsToTags[productId].indexOf(finalTagId) === -1) {
        mapProductsToTags[productId].push(finalTagId);
      }
    } else {
      mapProductsToTags[productId] = [finalTagId];
    }
  });
};

// Remove Tag entirely
exports.removeTagHelper = (tagLookup, tagIdToRemove) => {
  let { mapTagsToProducts } = tagLookup;
  
  // Remove tag id from forward lookup TagId -> ProductId[]
  if (mapTagsToProducts.hasOwnProperty(tagIdToRemove)) {
    delete mapTagsToProducts[tagIdToRemove];
  }

  // Remove tag id from reverse lookup ProductId -> TagId[]
  let { mapProductsToTags } = tagLookup;
  mapProductsToTags.forEach(productId => {
    let tagList = mapProductsToTags[productId];
    let tagIndex = tagList.indexOf(tagIdToRemove);
    if (tagIndex !== -1) {
      tagList.splice(tagIndex, 1);
    }
  });
};

// Add a new product to a Tag
exports.addProductToTagHelper = (tagLookup, tagIdToAdd, productIdToAdd) => {
  if (tagIdToAdd && productIdToAdd) {
    let { mapTagsToProducts } = tagLookup;

    // Add or update the forward lookup TagId -> ProductId[]
    let productsWithTag = mapTagsToProducts[tagIdToAdd].productIdList;
    if (productsWithTag.indexOf(productIdToAdd) === -1) {
      productsWithTag.push(productIdToAdd);
    }

    // Add or update the reverse lookup ProductId -> TagId[]
    let { mapProductsToTags } = tagLookup;
    let tagList = mapProductsToTags[productIdToAdd];

    if (tagList && tagList.indexOf(tagIdToAdd) === -1) {
      tagList.push(tagIdToAdd);
    }
  }
};

// Remove a product id from the specified Tag
exports.removeProductFromAllTagsHelper = (tagLookup, productIdToRemove) => {
  let { mapTagsToProducts } = tagLookup;

  // Remove product id from forward lookup TagId -> ProductId[]
  mapTagsToProducts.forEach(tagObj => {
    let productIndex = tagObj.productIdList.indexOf(productIdToRemove);
    if (productIndex !== -1) {
      tagObj.productIdList.splice(productIndex, 1);
    }
  });

  // Remove product id from reverse lookup ProductId -> TagId[]
  let { mapProductsToTags } = tagLookup;
  if (mapProductsToTags.hasOwnProperty(productIdToRemove)) {
    delete mapProductsToTags[productIdToRemove];
  }
};

// Get product list associated with a given tag
exports.getProductList = (database, tagId = null) => {
  let { mapTagsToProducts } = database.tagsLookup;
  if (tagId && mapTagsToProducts[tagId]) {
    let productIdsToAdd = mapTagsToProducts[tagId].productIdList;
    return productIdsToAdd.map(productId => [productId, database.productsHashById[productId]]);
  } else {
    return Object.entries(database.productsHashById);
  }
};

// Remove product from product list
exports.removeProductHelper = (productHash, productIdToRemove) => {
  if (productHash.hasOwnProperty(productIdToRemove)) {
    delete productHash[productIdToRemove];
  }
};

// Update product from product list
exports.addOrUpdateProductHelper = (productHash, productIdToAdd, productData) => {
  let { 
    title,
    ratingInStars,
    price,
    imageURL,
    imageAlt
  } = productData;

  productHash[productIdToAdd] = { 
    title,
    ratingInStars,
    price,
    imageURL,
    imageAlt
  };
};

// Add products to product list
exports.addProductsHelper = (productHash, productListToAdd) => {
  productListToAdd.forEach(productEntry => {
    let productId = productEntry[0];
    let productData = productEntry[1];
    exports.addOrUpdateProductHelper(productHash, productId, productData);
  });
};