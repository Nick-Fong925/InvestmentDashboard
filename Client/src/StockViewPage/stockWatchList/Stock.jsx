import PropTypes from 'prop-types';
import { Icon } from '@ui5/webcomponents-react';


const Stock = ({ stock, detail}) => {


  if (!detail) {
    return (
      <div className="flex items-center justify-between w-full">
        <span>{stock}</span>
        <span>Error fetching stock details.</span>
      </div>
    );
  }

  const { c: currentPrice, d: dayChange, dp: dayChangePercent, h: high, l: low } = detail;
  const changeSymbol = dayChange > 0 ? 'slim-arrow-up' : 'slim-arrow-down';
  const changeColor = dayChange > 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex items-center justify-between w-full">
        <span className="mr-4 font-bold text-violet-500">{stock}</span>
        <span className="mr-4 font-semibold">${currentPrice.toFixed(2)}</span>
        <div className="flex items-center">
          <Icon name={changeSymbol} className={`mr-1 ${changeColor}`} style={{ fontSize: '1rem' }} />
          <span className={`mr-2 ${changeColor}`}>{dayChangePercent.toFixed(2)}%</span>
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <span className="text-xs">Day High: ${high.toFixed(2)}</span>
        <span className="text-xs">Day Low: ${low.toFixed(2)}</span>
      </div>
    </div>
  );
};

Stock.propTypes = {
  stock: PropTypes.string.isRequired,
  detail: PropTypes.shape({
    c: PropTypes.number,
    d: PropTypes.number,
    dp: PropTypes.number,
    h: PropTypes.number,
    l: PropTypes.number,
  }),
};

export default Stock;