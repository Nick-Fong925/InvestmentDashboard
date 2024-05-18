import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux'; 
import { fetchQuote } from '../../utils/apis.js'; 
import Stock from './Stock.jsx';
import { List, StandardListItem } from '@ui5/webcomponents-react';
import { selectWatchlistItems } from '../../selectors/watchlistSelectors.js'; 

const StockWatchlist = () => {
  const watchlist = useSelector(selectWatchlistItems); 
  const [stockDetails, setStockDetails] = useState([]);
  const prevWatchlistRef = useRef([]);

  useEffect(() => {
 
    const fetchDetails = async () => {
      if (!watchlist || watchlist.length === 0) {
        setStockDetails([]);
        return;
      }

      const prevWatchlist = prevWatchlistRef.current;
      prevWatchlistRef.current = watchlist;

      if (arraysAreEqual(prevWatchlist, watchlist)) {
        return;
      }

      const details = await Promise.all(
        watchlist.map(async (stock) => {
          try {
            const detail = await fetchQuote(stock);
            return { stock, detail };
          } catch (error) {
            console.error(`Failed to fetch details for ${stock}:`, error);
            return { stock, detail: null, error: error.message };
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
  }, [watchlist]);

 
  function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 mt-5 text-violet-800">Stock Watchlist</h1>
      <List headerText="Stocks">
        {stockDetails.map(({ stock, detail }, index) => (
          <StandardListItem key={stock} className={index > 0 ? 'mt-4' : ''}>
            <Stock stock={stock} detail={detail} />
          </StandardListItem>
        ))}
      </List>
    </div>
  );
};

export default StockWatchlist;