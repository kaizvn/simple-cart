/**
 * Created by kainguyen on 6/20/17.
 */

//const promotion = require('./api/promotion');

const fs = require('fs');
const apiDir = __dirname + '/api/';
const fileNames = fs.readdirSync(apiDir);
const APIs = fileNames.map((fileName) => require(`${apiDir}/${fileName}`));
console.log(APIs);
module.exports = APIs;