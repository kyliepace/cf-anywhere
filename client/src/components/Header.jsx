'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import * as actions from '../actions';
import Icon from 'antd/lib/icon';

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

  const renderLinks = () => {
    if (props.authenticated) {
      return (
        <menu>
          <Link to="/signout">Sign Out</Link>
        </menu>
      )
    }
    else {
      return (
        <menu>
          <Link to="/signup">Register</Link>
          <Link to="/signin">Sign In</Link>
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={facebookResponse}
            icon='fa-facebook'
            textButton='Sign in with Facebook'
          />
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_ID}
            buttonText="Sign in with Google"
            onSuccess={googleResponse}
            onFailure={googleResponse}
          />
        </menu>
      )
    }
  };

  return (
    <header className="App-header">
      {renderLinks()}
      <span>
        CF PR Tracker
      </span>
    </header>
  )
};

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps, actions)(Header);