import ReactDOM from 'react-dom/client'
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from '@ui5/webcomponents-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme="sap_fiori_3_dark">
      <App />
    </ThemeProvider>
  </Provider>
)