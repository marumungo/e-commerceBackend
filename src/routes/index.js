const { Router } = require("express");

const router = Router();

// Declaro a los Routers
const cartsRouter = require("../routes/carts");
const productsRouter = require("../routes/products");
const viewsRouter = require("../routes/views");
const usersRouter = require("../routes/users");
const ordersRouter = require("../routes/orders");
const pruebasRouter = require("../routes/pruebas");
const sessionsRouter = require("../routes/sessions");

// Llamo a los Routers y coloco los endpoint de inicio
router.use("/api/products", productsRouter);
router.use("/api/carts", cartsRouter);
router.use("/api/users", usersRouter);
router.use("/api/orders", ordersRouter);
router.use("/api/pruebas", pruebasRouter);
router.use("/api/sessions", sessionsRouter);
router.use("/", viewsRouter);

module.exports = router;