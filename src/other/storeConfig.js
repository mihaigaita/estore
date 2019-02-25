import { configureStore } from 'redux-starter-kit'

// Includes [immutableStateInvariant, thunk, serializableStateInvariant] in DEV and only thunk in PROD
// Also see http://extension.remotedev.io/ and https://github.com/reduxjs/redux-thunk
import { getDefaultMiddleware } from 'redux-starter-kit'

// Reports unhandled actions. Docs at https://github.com/socialtables/redux-unhandled-action
import reduxUnhandledAction from "redux-unhandled-action";

// Docs at https://github.com/agraboso/redux-api-middleware
import { apiMiddleware } from 'redux-api-middleware';

import rootReducer from '../slices';

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [apiMiddleware, reduxUnhandledAction(), ...getDefaultMiddleware()],
    preloadedState,
    enhancers: []
  });

  // This allows webpack to reload reducers and refresh app while keeping its current state
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../slices', () => store.replaceReducer(rootReducer));
  }

  return store;
}