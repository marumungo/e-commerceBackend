const ProductDaoDataBase = require("../dao/dataBase/productDataBase");
const ProductDaoFile = require("../dao/file/productFile");
const ProductDaoMemory = require("../dao/memory/productMemory");

const productService = new ProductDaoDataBase();
// const productService = new ProductDaoFile();
// const productService = new ProductDaoMemory();


module.exports = {
    productService
};