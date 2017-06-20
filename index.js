/**
 * Created by kainguyen on 6/19/17.
 */

const express = require('express');
const bodyParser = require('body-parser');
const model = require('./model');
const APIs = require('./routes') || [];
const path = require('path');
const port = process.env.ENV_PORT || 3000;

const data = model();

const app = express();

app.use(express.static(path.resolve(__dirname, 'app', 'build')));
app.use(bodyParser.json());

APIs.forEach(api => {
  if (api.params) {
    api(data);
    app.use(api)
  }
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
});
