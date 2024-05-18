import { combineReducers } from 'redux';
import userReducer from './userReducer';
import watchlistReducer from './watchlistReducer';
import investedReducer from './investedReducer'; 

const rootReducer = combineReducers({
  watchlist: watchlistReducer,
  user: userReducer,
  invested: investedReducer 
});

export default rootReducer;