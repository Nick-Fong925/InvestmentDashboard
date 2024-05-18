import React from "react";
import { Card, CardHeader, Text } from "@ui5/webcomponents-react";
import { useSelector } from "react-redux";
import { getInvestedItems } from "../../selectors/investedSelectors";

const TotalInvestedCard = () => {
  const investedItems = useSelector(getInvestedItems);
  const dataset = investedItems || [];
  const totalHoldings =
    dataset.length > 0
      ? dataset.reduce((total, item) => total + item.currentHolding, 0)
      : 0;


  const formattedTotalHoldings = totalHoldings.toFixed(2);

  let largestHolding = 0;
  let largestHoldingTicker = "";
  dataset.forEach((item) => {
    if (item.currentHolding > largestHolding) {
      largestHolding = item.currentHolding;
      largestHoldingTicker = item.ticker;
    }
  });

  const formattedLargestHolding = largestHolding.toFixed(2);

  const cardStyle = {
    width: "300px",
    margin: "0 auto",
    marginTop: "1rem",
    color: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const contentStyle = {
    padding: "1rem",
  };

  const totalHoldingsStyle = {
    fontSize: "0.875rem",
    fontWeight: "normal",
    marginBottom: "0.5rem",
  };

  const largestHoldingStyle = {
    fontSize: "0.875rem",
    fontWeight: "normal",
  };

  const tickerStyle = {
    fontWeight: "bold",
    color: "#ff6b6b",
  };

  return (
    <Card
      header={<CardHeader titleText="Total Invested" interactive />}
      style={cardStyle}
    >
      <div style={contentStyle}>
        <Text style={totalHoldingsStyle}>
          Total Current Holdings: $ {formattedTotalHoldings}
        </Text>
        <Text style={largestHoldingStyle}>
          Largest Holding:{" "}
          <span style={tickerStyle}>{largestHoldingTicker}</span> $
          {formattedLargestHolding}
        </Text>
      </div>
    </Card>
  );
};

export default TotalInvestedCard;