/**
 *
 * Created by kainguyen on 6/20/17.
 */

const fs = require('fs');
const modelPath = __dirname + '/model';

module.exports = () => {
  const modelPaths = fs.readdirSync(modelPath);
  const models = {};

  modelPaths.forEach((path) => {
    const modelName = path.replace(/.{3}$/, '');
    models[modelName] = require(`${modelPath}/${path}`);
  });

  return models;
};
