import { PieChart } from "@ui5/webcomponents-react-charts";
import { useSelector } from "react-redux";
import { getInvestedItems } from "../../selectors/investedSelectors";

const PortfolioDistributionPieChart = () => {
  const investedItems = useSelector(getInvestedItems);
  const totalPortfolioValue = investedItems.reduce((total, item) => total + item.currentHolding, 0);

  const pieChartData = investedItems.map(item => ({
    name: `${item.ticker} (${((item.currentHolding / totalPortfolioValue) * 100).toFixed(2)}%)`,
    value: Math.ceil((item.currentHolding / totalPortfolioValue) * 100),
    proportion: item.currentHolding / totalPortfolioValue
  }));

  return (
    <PieChart
      dataset={pieChartData}
      dimension={{
        accessor: 'name'
      }}
  
      onClick={() => {}}
      onDataPointClick={() => {}}
    />
  );
};

export default PortfolioDistributionPieChart;