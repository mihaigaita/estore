import { RSAA, getJSON } from 'redux-api-middleware';

let requestActionCreators = (requestType = 'default', source = '', params = {}) => [
  {
    type: 'request',
    payload: params,
    meta: { 
      requestType,
      source
    }
  },
  {
    type: 'success',
    payload: (action, state, res) => getJSON(res),
    meta: { 
      requestType,
      source
    }
  },
  {
    type: 'failure',
    meta: (action, state, res) => {
      if (res) {
        return {
          status: res.status,
          statusText: res.statusText,
          requestType,
          source
        };
      } else {
        return {
          status: 'Network request failed',
          requestType,
          source
        }
      }
    }
  }
];

export const getProducts = (tagId = null, source = '') => {
  let route = tagId ? `http://localhost:3001/api/products/${tagId}` : '/api/products';
  return {
    [RSAA]: {
      endpoint: route,
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      types: requestActionCreators('getProducts', source, { tagId })
    }
  };
}

export const getTags = (source = '') => {
  return {
    [RSAA]: {
      endpoint: 'http://localhost:3001/api/tags',
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      types: requestActionCreators('getTags', source)
    }
  };
}

export const postProduct = (data = null, source = '') => {
  return {
    [RSAA]: {
      endpoint: 'http://localhost:3001/api/products',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      types: requestActionCreators('postProduct', source)
    }
  };
}

export const deleteProduct = (productId = null, source = '') => {
  return {
    [RSAA]: {
      endpoint: `http://localhost:3001/api/products/${productId}`,
      method: 'DELETE',
      types: requestActionCreators('deleteProduct', source, { productId })
    }
  };
}

// helpful decorator to filter RSAA by intended target using requestType
export const filterRSAAByTypeFactory = (reducer, requestType) => {
  return (state, action) => {
    if (requestType === action.meta.requestType) {
      return reducer(state, action);
    } // No need to handle else case and return state because of immer
  }
}