/**
 * Created by kainguyen on 6/20/17.
 */


const fs = require('fs');
console.log(__dirname);
const API_PATH = __dirname;
const APIList = fs.readdirSync(API_PATH);


module.exports = (router) => {
  console.log('APIList', APIList);
  APIList.forEach((path) => {
    const fullPath = `${API_PATH}/${path}`;

    if (fs.lstatSync(fullPath).isDirectory()) {
      require(fullPath)(router);
      console.log(`registered ${path} api`);
    }
  });
};