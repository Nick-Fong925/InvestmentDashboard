import Header from "../header/Header.jsx";
import Search from "./searchComponents/Search.jsx";
import StockWatchList from "./stockWatchList/stockWatchlist.jsx";
import StockHoldings from "./holdingsSearch/investedSearch.jsx";
import Holdings from "./stockHoldings/stockHoldings.jsx";
import NewsComponent from "./newsFinder/News.jsx";

const StockViewPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <div className="flex-grow w-full max-w-screen-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="bg-white p-4 rounded shadow">
              <Search />
            </div>
            <div className="bg-white p-4 rounded shadow">
              <StockWatchList />
            </div>
            <div className="bg-white p-4 rounded shadow">
              <StockHoldings />
            </div>
            <div className="bg-white p-4 rounded shadow">
              <Holdings />
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <NewsComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockViewPage;