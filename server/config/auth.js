module.exports = {

  'facebookAuth' : {
      'clientID'      : process.env.FACEBOOK_ID, // your App ID
      'clientSecret'  : process.env.FACEBOOK_SECRET, // your App Secret
      'callbackURL'   : 'http://localhost:3060/auth/facebook/callback',
      'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
      'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
  },

  'twitterAuth' : {
      'consumerKey'       : 'your-consumer-key-here',
      'consumerSecret'    : 'your-client-secret-here',
      'callbackURL'       : 'http://localhost:3060/auth/twitter/callback'
  },

  'googleAuth' : {
      'clientID'      : process.env.GOOGLE_ID,
      'clientSecret'  : process.env.GOOGLE_SECRET,
      'callbackURL'   : 'http://localhost:3060/auth/google/callback'
  }

};
