const { Router } = require("express");
const passport = require('passport');
const { getProducts, getProductById, createProducts, updateProducts, deleteProducts } = require('../controllers/products.controller');

// CODIGO PARA TRABAJAR CON FILESYSTEM
// const { ProductManagerFile } = require("../manager/file/productManagerFile");
// const productManager = new ProductManagerFile();

// Declaro y llamo al Router
const router = Router();

// GET en el que se verán todos los productos
router.get("/", passport.authenticate("jwt", {session: false}), getProducts);

// GET que devuelve un producto a partir de su id
router.get("/:id", getProductById);

// POST que agrega nuevos productos al array
router.post("/", createProducts);

// PUT que actualiza un producto según su id
router.put("/:id", updateProducts);

// DELETE que elimina un producto según su id
router.delete("/:id", deleteProducts);

module.exports = router;