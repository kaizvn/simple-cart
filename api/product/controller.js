/**
 * Created by kainguyen on 6/21/17.
 */

const model = require(__dirname + '/model');

class ProductController {
  constructor() {

  }

  getProducts(req, res) {
    return res.status(200).json({
      status: 200,
      data: model.productList
    });
  };
}

module.exports = new ProductController();