const { Router } = require("express");

const router = Router();

// Declaro a los Routers
const cartsRouter = require("./carts.router");
const productsRouter = require("./products.router");
const viewsRouter = require("./views.router");
const usersRouter = require("./users.router");
const ticketsRouter = require("./tickets.router");
const pruebasRouter = require("./pruebas.router");
const sessionsRouter = require("./sessions.router");
const contactsRouter = require("./contacts.router");


const newUsersRouter = require("./newUsers.router");
const userRouter = new newUsersRouter();

// Llamo a los Routers y coloco los endpoint de inicio
router.use("/api/products", productsRouter);
router.use("/api/carts", cartsRouter);
router.use("/api/users", usersRouter);
router.use("/api/tickets", ticketsRouter);
router.use("/api/pruebas", pruebasRouter);
router.use("/api/sessions", sessionsRouter);
router.use("/api/contacts", contactsRouter);

router.use("/api/newusers", userRouter.getRouter());
router.use("/", viewsRouter);


module.exports = router;