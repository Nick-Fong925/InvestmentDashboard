import PropTypes from 'prop-types';
import { List, CustomListItem } from '@ui5/webcomponents-react';
import '@ui5/webcomponents-icons/dist/add.js'; // Importing the "+" icon

const StockHoldingSearch = ({ results, onItemClick }) => {
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
          onClick={() => onItemClick(item.symbol)} 
        >
          <div className="flex-1 text-left">{item.symbol}</div>
          <div className="flex-1 text-right mr-3">{item.description}</div>
        </CustomListItem>
      ))}
    </List>
  );
};

StockHoldingSearch.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onItemClick: PropTypes.func.isRequired, 
};

export default StockHoldingSearch;