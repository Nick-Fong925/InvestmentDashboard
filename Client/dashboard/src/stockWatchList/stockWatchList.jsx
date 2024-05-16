import { useState } from 'react';
import { Card, CardHeader, Text, Input, Button, List, StandardListItem } from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";

const StockWatchList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [error, setError] = useState(null);


  return (
    <div>
      <Card header={<CardHeader titleText="Stock Watchlist" />} style={{ width: "300px" }}>
        <div style={{ padding: '1rem' }}>
          <Input
            placeholder="Enter Stock Ticker"
            value={searchQuery}
            onInput={(e) => setSearchQuery(e.target.value)}
            style={{ marginRight: '0.5rem' }}
          />
          <Button onClick={handleSearch}>Add</Button>
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
          <List>
            {watchlist.map((stock, index) => (
              <StandardListItem key={index}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={stock.icon} alt={stock.name} style={{ width: '24px', height: '24px', marginRight: '0.5rem' }} />
                  <Text>{stock.name}</Text>
                  <Text style={{ marginLeft: 'auto', color: stock.isIncrease ? 'green' : 'red' }}>
                    {stock.currentPrice} ({stock.isIncrease ? '↑' : '↓'})
                  </Text>
                </div>
              </StandardListItem>
            ))}
          </List>
        </div>
      </Card>
    </div>
  );
};

export default StockWatchList;