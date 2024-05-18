import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "@ui5/webcomponents-react";
import { searchSymbol } from "../../utils/apis.js";
import StockHoldingSearch from "./investedSearchResults.jsx";

const Search = () => {
  const [input, setInput] = useState("");
  const [investedAmount, setInvestedAmount] = useState("");
  const [sharePrice, setSharePrice] = useState("");
  const [bestMatches, setBestMatches] = useState([]);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const investedItems = useSelector((state) => state.invested.investedItems);

  const addInvestedItem = (ticker, pricePurchased, sharePrice, currentHolding) => ({
    type: 'ADD_INVESTED_ITEM',
    payload: { ticker, pricePurchased, sharePrice, currentHolding }
  });
  
  const updateBestMatches = async () => {
    try {
      if (input) {
        const searchResults = await searchSymbol(input);
        const result = searchResults.result;
        setBestMatches(result);
      }
    } catch (error) {
      setBestMatches([]);
   
    }
  };

  const clear = () => {
    setInput("");
    setInvestedAmount("");
    setSharePrice("");
    setBestMatches([]);
    setError("");
  };

  const handleItemClick = (symbol) => {
    setInput(symbol);
    setBestMatches([]);
  };

  const handleAddClick = () => {
    const investedAmountNum = parseFloat(investedAmount);
    const sharePriceNum = parseFloat(sharePrice);

    if (!input || isNaN(investedAmountNum) || isNaN(sharePriceNum)) {
      setError("Please enter valid numeric values for invested amount and share price.");
      return;
    }

    setError("");
    dispatch(addInvestedItem(input, investedAmountNum, sharePriceNum, 0));
    setInput("");
    setInvestedAmount("");
    setSharePrice("");
  };

  return (
    <div className="ml-5 my-4 w-96 relative">
      <div className="flex items-center border-2 rounded-md p-2 space-x-2">
        <Input
          value={input}
          placeholder="Search stock..."
          onInput={(event) => setInput(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              updateBestMatches();
            }
          }}
          className="flex-grow px-4 py-2"
        />
        <Input
          value={investedAmount}
          placeholder="$ invested..."
          onInput={(event) => setInvestedAmount(event.target.value)}
          className="flex-grow px-4 py-2"
        />
        <Input
          value={sharePrice}
          placeholder="Share Price"
          onInput={(event) => setSharePrice(event.target.value)}
          className="flex-grow px-4 py-2"
        />
        {input && (
          <Button
            icon="decline"
            onClick={clear}
            design="Transparent"
            className="m-1"
          />
        )}
        <Button
          icon="search"
          onClick={updateBestMatches}
          design="Emphasized"
          className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 transition duration-300 hover:ring-2 ring-indigo-400"
        />
      </div>

      {error && (
        <div className="text-red-500 mt-2">
          {error}
        </div>
      )}

      {input && bestMatches.length > 0 && (
        <div className="mt-4 w-full absolute top-10 left-0 bg-white z-10 border border-gray-300 shadow-lg">
          <StockHoldingSearch results={bestMatches} onItemClick={handleItemClick} />
        </div>
      )}

      <Button
        icon="add"
        onClick={handleAddClick}
        design="Emphasized"
        className="mt-4 w-full bg-green-600 rounded-md flex justify-center items-center p-2 transition duration-300 hover:ring-2 ring-green-400"
      >
        Add to Portfolio
      </Button>
    </div>
  );
};

export default Search;