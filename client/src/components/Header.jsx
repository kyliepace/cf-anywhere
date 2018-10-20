'use strict';
import React from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import * as actions from '../actions';
import Icon from 'antd/lib/icon';
import SignUp from './SignUp.jsx';

const Header = props => {

  const facebookResponse = (response) => {
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    const options = {
        method: 'POST',
        body: tokenBlob,
        mode: 'cors',
        cache: 'default'
    };
    fetch('http://localhost:3060/auth/facebook', options)
    .then(r => {
      r.json().then(body => {
        let token = body.token;
        let user = {
          name: response.name,
          email: response.email,
          picture: response.picture
        };
        if (token) {
          props.logIn(user, token);
        }
      });
    })
  };


  const googleResponse = (response) => {
    const tokenBlob = new Blob([JSON.stringify({access_token: response.tokenId}, null, 2)], {type : 'application/json'});

    const options = {
        method: 'POST',
        body: tokenBlob,
        mode: 'cors',
        cache: 'default'
    };
    fetch('http://localhost:3060/auth/google', options)
    .then(r => {
      r.json().then(body => {
        let token = body.token;
        let user = {
          name: response.w3.ig,
          email: response.w3.U3,
          picture: response.w3.Paa
        };
        if (token) {
          props.logIn(user, token);
        }
      });
    });
  };
  return (
    <header className="App-header">
      <menu>
        <SignUp {...props} />
        <a className="btn btn-default" href='http://localhost:3060/auth/login'>Login</a>
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_ID}
          autoLoad={false}
          fields="name,email,picture"
          callback={facebookResponse}
          icon='fa-facebook'
          textButton='Login with Facebook'
        />
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_ID}
          buttonText="Login"
          onSuccess={googleResponse}
          onFailure={googleResponse}
        />
        <button onClick={props.logOut} >Log Out</button>
        <Icon type='facebook'/>
      </menu>
      <span>
        CF PR Tracker
      </span>
    </header>
  )
};

export default connect(null, actions)(Header);