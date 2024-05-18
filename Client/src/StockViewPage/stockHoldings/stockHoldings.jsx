import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchQuote } from '../../utils/apis.js'; 
import HoldingStock from './Stock.jsx';
import { List, StandardListItem } from '@ui5/webcomponents-react';
import { getInvestedItems } from '../../selectors/investedSelectors.js'; 

const StockHoldings = () => {
  const dispatch = useDispatch(); 
  const holdings = useSelector(getInvestedItems);
  const investedItems = useSelector(getInvestedItems);  
  const [stockDetails, setStockDetails] = useState([]);
  const prevHoldingsRef = useRef([]);

  const updateInvestedItem = (ticker, currentValue) => ({
    type: "UPDATE_INVESTED_ITEM",
    payload: { ticker, currentValue }
  });

  useEffect(() => {
    const fetchDetails = async () => {
      if (!holdings || holdings.length === 0) {
        setStockDetails([]);
        return;
      }

      const prevHoldings = prevHoldingsRef.current;
      prevHoldingsRef.current = holdings;

      if (arraysAreEqual(prevHoldings, holdings)) {
        return;
      }

      const details = await Promise.all(
        holdings.map(async (holding) => {
          try {
            const detail = await fetchQuote(holding.ticker);
            if (!detail || !detail.c) {
              throw new Error("Invalid response format");
            }
            const shares = holding.pricePurchased / holding.sharePrice;
            const currentValue = detail.c * shares;
            dispatch(updateInvestedItem(holding.ticker, currentValue));

            const pricePurchased = parseFloat(holding.pricePurchased);
            const currentPrice = detail.c;
            const gainLoss = currentValue - pricePurchased; 
            const percentageGainLoss = (gainLoss / pricePurchased) * 100;
   
            return { holding, detail, currentValue, gainLoss, currentPrice, percentageGainLoss };
          } catch (error) {
            console.error(`Failed to fetch details for ${holding.ticker}:`, error);
            return { holding, detail: null, currentValue: null, gainLoss: null, error: error.message };
          }
        })
      );

      setStockDetails(details);

    };

    fetchDetails();


    const interval = setInterval(() => {
      fetchDetails();
    }, 60000);

    return () => clearInterval(interval);
  }, [holdings, dispatch, investedItems]);

  function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].ticker !== arr2[i].ticker || arr1[i].pricePurchased !== arr2[i].pricePurchased || arr1[i].shares !== arr2[i].shares) {
        return false;
      }
    }
    return true;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 mt-5 text-violet-800">Stock Holdings</h1>
      <List headerText="Holdings">
        {stockDetails.map(({ holding, detail, currentValue, gainLoss, percentageGainLoss }, index) => (
          <StandardListItem key={holding.ticker} className={index > 0 ? 'mt-4' : ''}>
            <HoldingStock holding={holding.ticker} detail={detail} currentValue={currentValue} gainLoss={gainLoss} percentageGainLoss = {percentageGainLoss}/>
          </StandardListItem>
        ))}
      </List>
    </div>
  );
};

export default StockHoldings;