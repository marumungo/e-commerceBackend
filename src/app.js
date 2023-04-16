const express = require("express");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const { socketChat } = require("./utils/socketChat");
const { socketProducts } = require("./utils/socketProducts");

// Declaro a los Routers
const cartsRouter = require("./routes/carts");
const productsRouter = require("./routes/products");
const viewsRouter = require("./routes/views");

// Llamo a express
const app = express();

// Declaro el puerto en el que se ejecutará el código, utilizando socket.io
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
})

const io = new Server(httpServer);

// Configuro handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Lectura de código compatible
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Declaro el endpoint que utilizará socket.io y llamo a la funcion
app.get('/chat', (req, res)=>{
    res.render('chat', {})
});

// Llamo a las funciones de socket (en utils)
socketChat(io);
socketProducts(io);

// Llamo a los Routers y coloco los endpoint de inicio
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/static", express.static(__dirname + "/public"));