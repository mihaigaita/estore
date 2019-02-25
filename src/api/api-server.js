/* eslint-disable no-param-reassign */
const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const cuid = require('cuid');
const cors = require('cors');
const { 
  removeProductFromAllTagsHelper,
  addProductToTagHelper,
  removeProductHelper,
  addOrUpdateProductHelper,
  getProductList,
  getTagList
} = require('../other/dbLayer');

// API Server configuration
const CORS_ORIGIN_WHITELIST = ['http://localhost:3000'];
const DB_FILE = path.join(__dirname, 'db.json');
const LOGGER_DEV_FORMAT = ':id :method :url :status :response-time ms - :res[content-length]';
const LOGGER_COMMON_FORMAT = ':id :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]';

// TODO: Handle errors in all routes and send appropriate
// status code and reponse back


// Basic Server configuration
let app = express();
app.set('port', (process.env.PORT || 3001));

// Add id token to logger format
logger.token('id', function getId (req) {
  return req.id
})

// Add id to request object
app.use((req, res, next) => {
  req.id = cuid();
  next();
  return;
});

// Log only 4xx and 5xx responses to console
app.use(logger(LOGGER_DEV_FORMAT, {
  skip: function (req, res) { return (res.statusCode < 400) }
}))

// Log all requests to access.log
app.use(logger(LOGGER_COMMON_FORMAT, {
  stream: fs.createWriteStream(path.join(__dirname, './access.log'), { flags: 'a' })
}))

// Add middleware which replaces the req.body binary data
// with the properly decoded value in case of JSON/URL-ENC data
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Add Cache-control headers for every request
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    res.setHeader('Cache-Control', 'no-store');
  } else {
    // TODO: Caching configuration, it's discussed here
    // https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching
  }
  next();
});

// Configure CORS
let corsOptions = {
  origin: function (origin, callback) {
    console.log(`Cross-origin request for origin ${origin} was whitelisted.`);

    if (CORS_ORIGIN_WHITELIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}

/* Routes */

// Return all products which have the requested tag
app.get('/api/products/:tagId', cors(corsOptions), (req, res) => {
  let tagIdToRetrieve = req.params.tagId;
  fs.readFile(DB_FILE, (err, binaryData) => {
    let DbInJSON = JSON.parse(binaryData);
    let productList = getProductList(DbInJSON, tagIdToRetrieve);
    res.json(productList);
  });
});

// Return all tags and their data
app.get('/api/tags/', cors(corsOptions), (req, res) => {
  fs.readFile(DB_FILE, (err, binaryData) => {
    let DbInJSON = JSON.parse(binaryData);
    let tagList = getTagList(DbInJSON);
    res.json(tagList);
  });
});

// Add a new product in the DB
app.post('/api/products', cors(corsOptions), (req, res) => {
  fs.readFile(DB_FILE, (err, binaryData) => {
    let DbInJSON = JSON.parse(binaryData);
    let newProduct = {
      title: req.body.title,
      ratingInStars: req.body.ratingInStars,
      price: req.body.price,
      imageURL: req.body.imageURL,
    };
    let { productId, tagId } = req.body;

    // Add new product to product hash, using its id as key
    addOrUpdateProductHelper(DbInJSON.productsHashById, productId, newProduct);

    // Add new product in the appropriate tag lookups
    addProductToTagHelper(DbInJSON.tagLookup, tagId, productId);

    // Save updates to DB file
    fs.writeFile(DB_FILE, JSON.stringify(DbInJSON, null, 2), () => {
      res.send('Added product\n' + JSON.stringify(newProduct, null, 2) + '\n');
    });
  });
});

// Enable pre-flight request for DELETE request
app.options('/api/products/:id', cors(corsOptions));

// Delete a product
app.delete('/api/products/:id', cors(corsOptions), (req, res, next) => {
  let productIdToRemove = req.params.id;

  fs.readFile(DB_FILE, (err, binaryData) => {
    let DbInJSON = JSON.parse(binaryData);

    // Remove product from every tag reverse lookup list
    removeProductFromAllTagsHelper(DbInJSON.tagsLookup, productIdToRemove);

    // Remove product from product hash
    removeProductHelper(DbInJSON.productsHashById, productIdToRemove);

    fs.writeFile(DB_FILE, JSON.stringify(DbInJSON, null, 2), () => {
      res.send(`\nDeleted product with id ${productIdToRemove}\n`);
    });
  });
});

// API Healtcheck
app.get('/healthcheck', (_, res) => {
  res.send('Green');
});

// 404 Handler
app.use(function(req, res){
  console.log('Route ' + req.originalUrl + ' not handled');
  res.status(404).send('\nError 404 Path not found\n');
});

// Activate server
app.listen(app.get('port'), () => {
  console.log(`Find the CORS-enabled server at: http://localhost:${app.get('port')}/`);
});