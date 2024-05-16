import { useState } from "react";
import { Input, Button } from "@ui5/webcomponents-react";
import { searchSymbol } from "../utils/apis.js";
import SearchResults from "./SearchResults.jsx";

const Search = () => {
  const [input, setInput] = useState("");
  const [bestMatches, setBestMatches] = useState([]);

  const updateBestMatches = async () => {
    try {
      if (input) {
        const searchResults = await searchSymbol(input);
        const result = searchResults.result;
        setBestMatches(result);
      }
    } catch (error) {
      setBestMatches([]);
      console.log(error);
    }
  };

  const clear = () => {
    setInput("");
    setBestMatches([]);
  };

  return (
    <div className="my-4 w-96">
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

      <div>
      {input && bestMatches.length > 0 && (
        <div className="mt-4 w-full">
          <SearchResults results={bestMatches} />
        </div>
      )}
      </div>

    </div>

  );
};

export default Search;
