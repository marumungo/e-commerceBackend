const ProductDaoMongo = require("../manager/mongo/product.mongo");

const productService = new ProductDaoMongo();

module.exports = {
    productService
};