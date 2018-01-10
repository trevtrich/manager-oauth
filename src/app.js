const mySqlConnection = require('./dbHelpers/mySqlWrapper');
const bearerTokensDBHelper = require('./dbHelpers/bearerTokensDBHelper')(mySqlConnection);
const userDBHelper = require('./dbHelpers/userDBHelper')(mySqlConnection);

const bodyParser = require('body-parser');
const express = require('express');
const OAuthServer = require('express-oauth-server');

const app = express();

const authRoutesMethods = require('./authorization/auth-routes-methods')(userDBHelper);
const authRouter = require('./authorization/auth-router')(express.Router(), expressApp, authRoutesMethods);

expressApp.use('/auth', authRouter);

expressApp.use(expressApp.oauth.errorHandler());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => { console.log(`listening on port ${port}`); });
