import { createSlice } from 'redux-starter-kit';

// Reducers which update state immutably via immer 
// proxy object (under the hood of createSlice):

let enableLoadingAnimation = (draftAppState, action) => {
  draftAppState.loadingAnimation = true;
  console.log('enableLoadingAnimation');
};

let disableLoadingAnimation = (draftAppState, action) => {
  draftAppState.loadingAnimation = false;
  console.log('disableLoadingAnimation');
};

// TODO: Add id of notification and display it on the screen using a React component
let showNotification = (draftAppState, action) => {
  draftAppState.notificationContent = action.payload.message;
  console.log('Notification: ', action.payload.message);
};

let removeNotification = (draftAppState, action) => {
  draftAppState.notificationContent = '';
};

let showRequestError = (draftAppState, action) => {
  let message;
  let { status, statusText, source } = action.meta;
  if (statusText) {
    message = `Response status ${status}: ${statusText} from source -> ${source}`;
  } else {
    message = `${status} from source -> ${source}`;
  }
  showNotification(draftAppState, { payload: { message }});
  disableLoadingAnimation(draftAppState, action);
};

export default createSlice({
  slice: 'appState',
  initialState: {
    "loadingAnimation": false,
    "notificationContent": ""
  },
  reducers: {
    enableLoadingAnimation,  // payload: { }
    disableLoadingAnimation, // payload: { }
    showNotification,        // payload: { message }
    removeNotification       // payload: { }
  },
  extraReducers: {
    'request': enableLoadingAnimation,
    'success': disableLoadingAnimation,
    'failure': showRequestError
  }
})