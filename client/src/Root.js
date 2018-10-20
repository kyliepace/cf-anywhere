import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';


export default ({ children }) => {
  let store;
  if (process.env.NODE_ENV === "development") {
    let composeWithDevTools = require("redux-devtools-extension/developmentOnly")
      .composeWithDevTools;
    store = createStore(
      reducers,
      {
        auth: { authenticated: localStorage.getItem('token') }
      },
      composeWithDevTools(applyMiddleware(reduxThunk))
    );
  }
  else {
    store = createStore(
      reducers,
      {
        auth: { authenticated: localStorage.getItem('token') }
      },
      applyMiddleware(reduxThunk)
    );
  }

  return <Provider store={store}>{children}</Provider>;
};
