import PropTypes from 'prop-types';
import { useDispatch} from 'react-redux';
import { List, CustomListItem, Button } from '@ui5/webcomponents-react';
import '@ui5/webcomponents-icons/dist/add.js'; // Importing the "+" icon

const SearchResults = ({ results }) => {
  const dispatch = useDispatch();

  const addStockToWatchlist = (symbol) => {
    dispatch({
      type: 'ADD_TO_WATCHLIST',
      payload: symbol,
    });
  };


  return (
    <List
      style={{
        width: '100%',
        maxHeight: '16rem',
        borderRadius: '0.25rem',
        overflowY: 'auto',
        border: '0.125rem solid var(--sapContent_NeutralBorderColor)',
      }}
    >
      {results.map((item) => (
        <CustomListItem
        key={item.symbol}
        className="flex justify-between items-center p-2"
      >
        <div className="flex-1 text-left">{item.symbol}</div>
        <div className="flex-1 text-right mr-3">{item.description}</div>
        <Button icon="sap-icon://add" text="Add Item" onClick={() => addStockToWatchlist(item.symbol)}/>
      </CustomListItem>
      ))}
    </List>
  );
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SearchResults;



