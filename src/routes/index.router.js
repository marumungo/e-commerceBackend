const { Router } = require("express");

const router = Router();

// Declaro a los Routers
const cartsRouter = require("./carts.router");
const productsRouter = require("./products.router");
const viewsRouter = require("./views.router");
const usersRouter = require("./users.router");
const ordersRouter = require("./orders.router");
const pruebasRouter = require("./pruebas.router");
const sessionsRouter = require("./sessions.router");

const newUsersRouter = require("./newUsers.router");
const userRouter = new newUsersRouter();

// Llamo a los Routers y coloco los endpoint de inicio
router.use("/api/products", productsRouter);
router.use("/api/carts", cartsRouter);
router.use("/api/users", usersRouter);
router.use("/api/orders", ordersRouter);
router.use("/api/pruebas", pruebasRouter);
router.use("/api/sessions", sessionsRouter);

router.use("/api/newusers", userRouter.getRouter());
router.use("/", viewsRouter);


module.exports = router;