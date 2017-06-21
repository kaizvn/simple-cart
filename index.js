/**
 * Created by kainguyen on 6/19/17.
 */

const express = require('express');
const bodyParser = require('body-parser');
const APIs = require('./api');
const path = require('path');
const port = process.env.ENV_PORT || 3000;
router = express.Router();

const app = express();

app.use(express.static(path.resolve(__dirname, 'app', 'build')));

app.use(bodyParser.json());

APIs(router);

router.get('/ping', (req, res) => {
  res.end('pong!');
});

app.use('/api', router);

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
});
