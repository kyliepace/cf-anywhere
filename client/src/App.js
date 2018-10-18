import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

class App extends Component {
  render() {
    console.log(process.env)
    return (
      <div className="App">
        <header className="App-header">
          CrossFit PR Tracker
          <menu>
            <a className="btn btn-default" href='http://localhost:3060/register'>Local Signup</a>
            <a className="btn btn-default" href='http://localhost:3060/login'>Local Login</a>
            <a className="btn btn-default" href='http://localhost:3060/auth/facebook'>Facebook Login</a>
            <button className="btn btn-default" onClick={this.props.googleLogin} >Google Login</button>
            <a href='http://localhost:3060/auth/google'>Google Login Link</a>
            <FacebookLogin
              appId="XXXXXXXXXX"
              autoLoad={false}
              fields="name,email,picture"
              callback={this.facebookResponse} />
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_ID}
              buttonText="Login"
              onSuccess={this.googleResponse}
              onFailure={this.googleResponse}
            />
          </menu>
        </header>
        <main>

        </main>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  const googleLogin = async(e) => {
    e.preventDefault();
    const response = await axios.get('http://localhost:3060/auth/google')
    // const response = await axios.get('http://localhost:3060/auth/google', {
    //   headers: {
    //     'Access-Control-Allow-Origin' : '*',
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   withCredentials: true
    // });
    console.log(response)
    dispatch({ type: 'AUTH_USER', payload: response})
  };
  return {
    googleLogin
  }
}

export default connect(null, mapDispatchToProps)(App);
