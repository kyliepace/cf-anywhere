import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Root from './Root.js';
import './index.css';
import App from './components/App';
//import * as serviceWorker from './serviceWorker';
import SignUp from './components/auth/SignUp.jsx';
import SignOut from './components/auth/SignOut.jsx';
import SignIn from './components/auth/SignIn.jsx';

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <App>
        <Route path="/signup" component={SignUp} />
        <Route path="/signout" component={SignOut} />
        <Route path="/signin" component={SignIn} />
      </App>
    </BrowserRouter>
  </Root>,
  document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
