const { Router } = require("express");
const { getCarts, getCartById, createCarts, createCartsById, updateCarts, updateCartsById, deleteCarts, deleteCartsById } = require("../controllers/carts.controller");

const path = "./manager/carts.json";

// Declaro y llamo al Router
const router = Router();

// Declaro un array donde se almacenarán los carritos (FILESYSTEM)
// let carts = [];

// GET que devuelve todos los carritos
router.get("/", getCarts);

// GET que muestra un carrito según su id
router.get("/:cid", getCartById);

// POST que crea un carrito
router.post("/", createCarts);

// POST que agregue un producto por id, a un carrito segun su id
router.post("/:cid/product/:pid", createCartsById);

// PUT que actualiza el carrito con un array de productos
router.put("/:cid", updateCarts);

// PUT que actualiza la cantidad de un producto de un carrito segun su id
router.put("/:cid/product/:pid", updateCartsById);

// DELETE que borra los productos de un carrito segun su id
router.delete("/:cid", deleteCarts);

// DELETE que borra un producto de un carrito segun su id
router.delete("/:cid/product/:pid", deleteCartsById);

module.exports = router;