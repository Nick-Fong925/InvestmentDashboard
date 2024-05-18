const initialInvestedState = {
  investedItems: []
};

const investedReducer = (state = initialInvestedState, action) => {
  switch (action.type) {
    case 'ADD_INVESTED_ITEM':
      // Check if the item already exists based on the stock ticker
      if (state.investedItems.some(item => item.ticker === action.payload.ticker)) {
        return state;
      }

      return {
        ...state,
        investedItems: [...state.investedItems, action.payload]
      };

    case 'REMOVE_INVESTED_ITEM':
      return {
        ...state,
        investedItems: state.investedItems.filter(item => item.ticker !== action.payload.ticker)
      };

    case 'UPDATE_INVESTED_ITEM': {

      let updatedIndex = state.investedItems.findIndex(item => item.ticker === action.payload.ticker);
      if (updatedIndex !== -1) {
        const updatedItem = { ...state.investedItems[updatedIndex], currentHolding: action.payload.currentValue };
        const updatedInvestedItems = [
          ...state.investedItems.slice(0, updatedIndex),
          updatedItem,
          ...state.investedItems.slice(updatedIndex + 1)
        ];
        return { ...state, investedItems: updatedInvestedItems };
      }
      return state;
    }

    default:
      return state;
  }
};

export default investedReducer;