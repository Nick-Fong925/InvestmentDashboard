import { combineReducers } from 'redux';
import userReducer from './userReducer';
import watchlistReducer from './watchlistReducer';


const rootReducer = combineReducers({
  watchlist: watchlistReducer,
  user: userReducer,
  
});

export default rootReducer;