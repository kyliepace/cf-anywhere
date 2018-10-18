import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { AUTH_USER, UPDATE_USER } from '../actions/types'

class App extends Component {
  facebookResponse = (response) => {
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
          this.props.logIn(user, token);
        }
      });
    })
  };

  googleResponse = (response) => {
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
          this.props.logIn(user, token);
        }
      });
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          CrossFit PR Tracker
          <menu>
            <a className="btn btn-default" href='http://localhost:3060/register'>Local Signup</a>
            <a className="btn btn-default" href='http://localhost:3060/login'>Local Login</a>

            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_ID}
              autoLoad={false}
              fields="name,email,picture"
              callback={this.facebookResponse} />
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_ID}
              buttonText="Login"
              onSuccess={this.googleResponse}
              onFailure={this.googleResponse}
            />
            <button onClick={this.props.logOut} >Log Out</button>
          </menu>
        </header>
        <main>

        </main>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  const logIn = (user, token) => {
    dispatch({
      type: AUTH_USER,
      payload: token
    });

    dispatch({
      type: UPDATE_USER,
      payload: user
    });
  };

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');

    return dispatch({
      type: AUTH_USER,
      payload: ''
    });
  };

  return {
    logOut,
    logIn
  }
}

export default connect(null, mapDispatchToProps)(App);
