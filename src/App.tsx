import React from 'react';
import createStore from './store';
import { Provider, subscriptionExchange, defaultExchanges, Client } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import Dashboard from './components/Dashboard';

const subscriptionClient = new SubscriptionClient('wss://react.eogresources.com/graphql', {
  reconnect: true,
  timeout: 20000,
});

const client = new Client({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription(operation) {
        return subscriptionClient.request(operation);
      },
    }),
  ],
});

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <ReduxProvider store={store}>
      <Wrapper>
        <Header />
        <Provider value={client}>
          <Dashboard />
        </Provider>
        <ToastContainer />
      </Wrapper>
    </ReduxProvider>
  </MuiThemeProvider>
);

export default App;
