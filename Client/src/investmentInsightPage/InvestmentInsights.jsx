import Header from '../header/Header'
import HoldingChart from './holdingChart/holdingChart.jsx';
import TotalInvestedCard from './InsightCards/totalinvestedCard.jsx';

const InvestmentInsight = () => {
  return (
    <div>
    <Header/>
    <HoldingChart/>
    <TotalInvestedCard />
    </div>
  );
};

export default InvestmentInsight;