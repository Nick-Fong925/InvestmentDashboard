const initialState = {
    watchlistItems: []
  };
  
  const watchlistReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_WATCHLIST':
 
        if (state.watchlistItems.includes(action.payload)) {
    
          return state;
        }
  
        return {
          ...state,
          watchlistItems: [...state.watchlistItems, action.payload]
        };
      case 'REMOVE_FROM_WATCHLIST':
        return {
          ...state,
          watchlistItems: state.watchlistItems.filter(item => item !== action.payload)
        };
      default:
        return state;
    }
  };
  
  export default watchlistReducer;