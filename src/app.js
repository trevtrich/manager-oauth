import bodyParser from 'body-parser';
import express from 'express';
import OAuthServer from 'express-oauth-server';
import oAuth2Server from 'oauth2-server';
import registerUser from './authorization/auth-routes-methods';
import {users, accessTokens} from './user-db';

function getClient(clientID, clientSecret, callback){
  const client = {
    clientID,
    clientSecret,
    grants: null,
    redirectUris: null
  }
  console.log('--getting client');

  callback(false, client);
}

function grantTypeAllowed(clientID, grantType, callback) {
  console.log('grantTypeAllowed called and clientID is: ', clientID, ' and grantType is: ', grantType);
  callback(false, true);
}

function getUser(username, password, callback){
  const user = users.filter(user => user.username === username && user.password === password)[0];
  console.log({users});
  console.log('getUser() called and username is: ', username, ' and password is: ', password, ' and the user found was: ', user);
  callback(false, user);
}

function saveAccessToken(accessToken, clientID, expires, user, callback){
  console.log('saveAccessToken() called and accessToken is: ', accessToken,
  ' and clientID is: ',clientID, ' and user is: ', user)

  accessTokens.push({'user-id': user.id, accessToken});
  callback();
}

function getAccessToken(bearerToken, callback){
  console.log('getAccessToken() called with bearer token: ', bearerToken);

  const token = accessTokens.filter(({accessToken, 'user-id': userId}) => bearerToken === accessToken)[0];

  callback(token ? false : true, token && token.accessToken);
}

function protectedHandler(req, res) {
  console.log('-- we made it to the protected endpoint!');
}

const app = express();
app.oauth = oAuth2Server({
  model: {
    getClient,
    saveAccessToken,
    getUser,
    grantTypeAllowed,
    getAccessToken
  },
  grants: ['password'],
  debug: true
})

const authRouter = require('./authorization/auth-router')(express.Router(), app, registerUser);

app.use(app.oauth.errorHandler());
app.use(bodyParser.urlencoded({extended: true}));

authRouter.get('/', (req, res) => {
  console.log({req});
  res.send('You passed the creds');
});

app.use('/auth', authRouter);
app.use('/protected', app.oauth.authorise(), authRouter);

app.listen(3000, () => { console.log(`listening on port 3000`); });
