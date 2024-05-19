import { Card, CardHeader, Icon, Text, List, StandardListItem } from "@ui5/webcomponents-react";
import { useSelector } from "react-redux";
import { getInvestedItems } from "../../selectors/investedSelectors";

const AverageInvestmentCard = () => {
  const investedItems = useSelector(getInvestedItems);
  const dataset = investedItems || [];
  const totalHoldings = dataset.reduce((total, item) => total + item.currentHolding, 0);
  const averageInvestment = dataset.length > 0 ? (totalHoldings / dataset.length) : 0;
  const formattedAverageInvestment = averageInvestment.toFixed(2);

  return (
    <Card
      header={<CardHeader titleText="Investments Overview" interactive />}
      className="w-full mx-auto mt-5 bg-white shadow-md rounded-lg"
    >
      <div className="p-4">
        <Text className="text-lg mb-4">
          <Icon name="money-bills" className="mr-2" /> Average Investment: $ {formattedAverageInvestment}
        </Text>
        <List headerText="Current Investments">
          {dataset.map((item) => {
            const increase = ((item.currentHolding / item.pricePurchased) * 100).toFixed(2);
            const increaseClass = item.currentHolding >= item.pricePurchased ? 'text-green-500' : 'text-red-500';
            const icon = item.currentHolding >= item.pricePurchased ? "slim-arrow-up" : "slim-arrow-down";

            return (
              <StandardListItem key={item.ticker}>
                <div className="flex items-center justify-between">
                  <Text className="flex items-center">
                    <Icon name="money-bills" className="mr-2" /> {item.ticker}: $ {item.currentHolding.toFixed(2)}
                  </Text>
                  <p className={`flex items-center ${increaseClass}`}>
                    <Icon name={icon} className="mr-2" /> {increase}%
                  </p>
                </div>
              </StandardListItem>
            );
          })}
        </List>
      </div>
    </Card>
  );
};

export default AverageInvestmentCard;
