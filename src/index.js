const bodyParser = require('body-parser');
const express = require('express');
const OAuthServer = require('express-oauth-server');

const app = express();

app.oauth = new OAuthServer({
  model: {}
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(app.oauth.authorize());

app.use((req, res) => {
  res.send('Secret area');
});

app.listen(3000);
