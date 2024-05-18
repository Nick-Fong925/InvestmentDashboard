import { Card, CardHeader, Text} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import { BarChart } from "@ui5/webcomponents-react-charts";
import { useSelector } from "react-redux";
import { getInvestedItems } from "../../selectors/investedSelectors";

const HoldingChart = () => {
  const investedItems = useSelector(getInvestedItems);

  
  const dataset = investedItems || [];

 
  const totalHoldings = dataset.reduce((total, item) => total + item.currentHolding, 0);

  return (
    <div>
      <Card
        header={
          <CardHeader
            titleText="Investment Distribution"
            interactive
          />
        }
        style={{ width: "300px" }}
      >
        <Text style={spacing.sapUiContentPadding}>
          Total Current Holdings: $ {totalHoldings}
        </Text>
        <BarChart
          dimensions={[{ accessor: "ticker" }]}
          measures={[{ accessor: "currentHolding", label: "Current Holding" }]}
          dataset={dataset}
        />
      </Card>
    </div>
  );
};

export default HoldingChart;