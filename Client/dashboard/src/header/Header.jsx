// src/Header.jsx
import {
  ShellBar,
  Avatar,
  Button,
} from '@ui5/webcomponents-react';
import investmentIcon from "../assets/headerAssests/investment.png"

const Header = () => {
  return (
    <ShellBar
      primaryTitle="Investment Insights"
      secondaryTitle="Market Watch"
      showNotifications
      notificationsCount="0"
      logo={<img src={investmentIcon} alt="Logo" />}
      profile={<Avatar initials="JD" />}
    >
      <Button icon="sap-icon://menu" slot="startButton" />
      <Button icon="sap-icon://log" slot="endButton" />

    </ShellBar>
  );
};

export default Header;