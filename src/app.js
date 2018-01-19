import bodyParser from 'body-parser';
import express from 'express';
import OAuthServer from 'express-oauth-server';
import oAuth2Server from 'oauth2-server';
import registerUser from './authorization/auth-routes-methods';

const app = express();
app.oauth = oAuth2Server({
  model: {
    getClient: () => console.log('--getting client'),
    saveAccessToken: () => console.log('--saving access token'),
    getUser: () => console.log('--getting user'),
    grantTypeAllowed: () => console.log('-- grant types allow'),
    getAccessToken: () => console.log('-- getting access token')
  },
  grants: ['password'],
  debug: true
})

const authRouter = require('./authorization/auth-router')(express.Router(), app, registerUser);

app.use(app.oauth.errorHandler());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/auth', authRouter);

app.listen(3000, () => { console.log(`listening on port 3000`); });
