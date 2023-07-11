const { Router } = require("express");
const passport = require('passport');
const jwt = require("jsonwebtoken");
const { getProducts, getProductById, addProduct, updateProducts, deleteProducts, getProductsPaginate } = require('../controllers/products.controller');
const { authorization } = require("../passport-jwt/authorizationJwtRole");
const { passportCall } = require("../passport-jwt/passportCall");

const router = Router();

// GET en el que se verán todos los productos
router.get("/", getProducts);

// GET que devuelve un producto a partir de su id
router.get("/:id", getProductById);

// POST que agrega nuevos productos al array
// router.post("/", passportCall("jwt"), authorization("admin"), addProduct);
router.post("/", addProduct);

// PUT que actualiza un producto según su id
router.put("/:id", passportCall("jwt"), authorization("admin"), updateProducts);

// DELETE que elimina un producto según su id
router.delete("/:id", passportCall("jwt"), authorization("admin"), deleteProducts);

module.exports = router;