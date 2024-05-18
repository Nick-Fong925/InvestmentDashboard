import { useState } from "react";
import { SideNavigation, SideNavigationItem, SideNavigationSubItem } from "@ui5/webcomponents-react";
import StockViewPage from "./StockViewPage/StockViewPage";
import InvestmentInsight from "./investmentInsightPage/InvestmentInsights";

const App = () => {
  const [currentPage, setCurrentPage] = useState("MarketWatch");

  const handleNavigationChange = (event) => {
    const selectedItem = event.detail.item.text;
    switch (selectedItem) {
      case "Market Watch":
        setCurrentPage("MarketWatch");
        break;
      case "Investment Insight":
        setCurrentPage("InvestmentInsight");
        break;
      default:
        setCurrentPage("MarketWatch");
        break;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <SideNavigation
        style={{ width: "250px", height: "100vh", backgroundColor: "#f0f0f0" }}
        onSelectionChange={handleNavigationChange}
        fixedItems={
          <>
            <SideNavigationItem href="https://github.com/Nick-Fong925" icon="chain-link" target="_blank" text="External Link" />
          </>
        }
      >
        <SideNavigationItem expanded icon="home" text="Dashboard">
          <SideNavigationSubItem text="Market Watch" />
          <SideNavigationSubItem text="Investment Insight" />
        </SideNavigationItem>
      </SideNavigation>

      {currentPage === "MarketWatch" ? <StockViewPage /> : <InvestmentInsight />}
    </div>
  );
};

export default App;