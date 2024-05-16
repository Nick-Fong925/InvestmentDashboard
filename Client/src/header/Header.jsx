// src/Header.jsx
import {
  ShellBar,
  Avatar,
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
    </ShellBar>
  );
};

export default Header;