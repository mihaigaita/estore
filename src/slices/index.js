import { combineReducers } from 'redux';
import productsSlice from './products';
import cartSlice from './cart';
import tagsSlice from './tags';
import appStateSlice from './appState';

export default combineReducers({
  productsHashById: productsSlice.reducer,
  tagsLookup: tagsSlice.reducer,
  productsInCart: cartSlice.reducer,
  appState: appStateSlice.reducer
})