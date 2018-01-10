const bodyParser = require('body-parser');
const express = require('express');
const OAuthServer = require('express-oauth-server');

const app = express();

app.oauth = new OAuthServer({
  model: {}
});

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
  console.log(`listening on port ${port}`);
});
