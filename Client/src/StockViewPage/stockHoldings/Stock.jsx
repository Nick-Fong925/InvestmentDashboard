import PropTypes from 'prop-types';
import { Icon } from '@ui5/webcomponents-react';

const HoldingStock = ({ holding, detail, currentValue, gainLoss, percentageGainLoss }) => {
  if (!detail) {
    return (
      <div className="flex items-center justify-between w-full">
        <span>{holding}</span>
        <span>Error fetching stock details.</span>
      </div>
    );
  }

  const { c: currentPrice} = detail;
  const changeColor = percentageGainLoss > 0 ? 'text-green-500' : 'text-red-500';

  const percentageGainLossColor = percentageGainLoss < 0 ? 'text-red-500' : 'text-green-500';
  const percentageGainLossSymbol = percentageGainLoss < 0 ? 'slim-arrow-down' : 'slim-arrow-up';

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex items-center justify-between w-full">
        <span className="mr-4 font-bold text-violet-500">{holding}</span>
        <span className="mr-4 font-semibold">${currentPrice.toFixed(2)}</span>
        <div className="flex items-center">
    
          <span className={`mr-2 ${changeColor}`}>{percentageGainLoss.toFixed(2)}%</span>
          <Icon name={percentageGainLossSymbol} className={`mr-1 ${percentageGainLossColor}`} style={{ fontSize: '1rem' }} />
        </div>
      </div>
 
      {currentValue !== null && gainLoss !== null && (
        <div className="flex items-center justify-between w-full mt-2">
          <span className="text-xs">Current Value: ${currentValue.toFixed(2)}</span>
          <span className={`text-xs ${gainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            Gain/Loss: ${gainLoss.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
};

HoldingStock.propTypes = {
  holding: PropTypes.string.isRequired,
  detail: PropTypes.shape({
    c: PropTypes.number,
    d: PropTypes.number,
    dp: PropTypes.number,
    h: PropTypes.number,
    l: PropTypes.number,
  }),
  currentValue: PropTypes.number,
  gainLoss: PropTypes.number,
  percentageGainLoss: PropTypes.number,
};

export default HoldingStock;