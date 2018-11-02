##Creation
Made with the react-create-app tool, then added on a symmetrical server application that uses Koa.

To run client:
```
cd client
npm run start
```

To run server:
```
cd server
npm run dev
```

##Authentication
Since these are two different apps, I encountered CORS difficulty using a [standard single-app approach](https://mherman.org/blog/user-authentication-with-passport-and-koa/) to using [social authentication with passport](https://scotch.io/tutorials/easy-node-authentication-facebook).

Finally I found [a tutorial to help me out](https://medium.com/@alexanderleon/implement-social-authentication-with-react-restful-api-9b44f4714fa), but found a few places where I needed to make some changes.

###Google
I started with adding Google authentication so that when the user clicks the Google button, Google returns a response with an access token. That gets sent from the client to the server for server-side authentication.

The Medium article linked above uses passport-google-token on the server-side, but I found that hadn't been updated in at least 2 years and found a more recent library passport-google-id-token, that I used instead to validate the google id token.

```
import { GoogleLogin } from 'react-google-login';

class App extends Component {
  googleResponse = response => {
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
  }

  render() {
    return (
      <div className='App'>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_ID}
          buttonText="Login"
          onSuccess={this.googleResponse}
          onFailure={this.googleResponse}
        />
      </div>
    )
  }
}
```

Another spot of trouble I had with passport-google-id-token and my choice to use koa instead of express was that the request body wasn't located where the library expected it to be. Dear reader, I cheated and opened the koa.js file in the koa-passport node_modules folder, adding ```ctx.body = ctx.request.body``` to line 105.

Next change: the callback parameters in the google passport strategy (server/config/strategies/google.js) should be ```(token, googleID, done)``` instead of ```(accessToken, refreshToken, profile, done)```. Upon authentication, the server creates and sends a new JWT to the user and redux updates to show that the user is now logged in.


###Facebook
I stuck to the instructions in the Medium article and had no problems.