import { Card, CardHeader, Icon, Text } from "@ui5/webcomponents-react";
import { useSelector } from "react-redux";
import { getInvestedItems } from "../../selectors/investedSelectors";

const BestPerformingInvestmentCard = () => {
  const investedItems = useSelector(getInvestedItems);
  const dataset = investedItems || [];
  
  let bestPerformingTicker = "";
  let bestPerformance = -Infinity;

  dataset.forEach((item) => {
    const performance = item.currentHolding - item.pricePurchased;
    if (performance > bestPerformance) {
      bestPerformance = performance;
      bestPerformingTicker = item.ticker;
    }
  });

  const formattedBestPerformance = bestPerformance.toFixed(2);

  return (
    <Card
      header={<CardHeader titleText="Best Performing Investment" />}
      className="w-full mx-auto mt-5 bg-white shadow-md rounded-lg"
    >
      <div className="p-4 flex flex-col items-start">
    
        <div className="flex items-center mb-2">
          <Icon name="money-bills" className="mr-2 text-green-500" />
          <Text className="text-2xl font-bold text-green-500">{bestPerformingTicker}</Text>
        </div>
        <div className="flex items-center">
          <Text className="text-xl text-green-500"><span className = "font-bold">Profit:</span> ${formattedBestPerformance}</Text>
        </div>
      </div>
    </Card>
  );
};

export default BestPerformingInvestmentCard;
