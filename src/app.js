const express = require("express");
const handlebars = require("express-handlebars");
const routerServer = require("./routes/index");
const { Server } = require("socket.io");
const { socketChat } = require("./utils/socketChat");
const { socketProducts } = require("./utils/socketProducts");
const objectConfig = require("./config/objectConfig");
const logger = require("morgan");

// Llamo a express
const app = express();

// Declaro el puerto en el que se ejecutará el código, utilizando socket.io
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
});

const io = new Server(httpServer);

// Ejecuto la configuracion de la base de datos
objectConfig.connectDB();

// Configuro handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Lectura de código compatible
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/static", express.static(__dirname + "/public"));
app.use(logger("dev"));

// Declaro el endpoint que utilizará socket.io y llamo a la funcion
app.get('/chat', (req, res)=>{
    res.render('chat', {})
});

// Llamo a las funciones de socket (en utils)
socketChat(io);
socketProducts(io);

// Llamo al archivo que contiene los Routers
app.use(routerServer);
