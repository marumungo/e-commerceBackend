const express = require("express");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");

// Llamo a express
const app = express();

// Declaro el puerto en el que se ejecutará el código, utilizando socket.io
const PORT = 8080;

const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`);
})

const io = new Server(httpServer);

// Configuro handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Declaro a los Routers
const cartsRouter = require("./routes/carts");
const productsRouter = require("./routes/products");
const viewsRouter = require("./routes/views");
const { uploader } = require('./utils/multer');

// Lectura de código compatible
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Declaro el endpoint que utilizará handlebars
app.get("/vista", (req, res) => {
    let testUser = {
        name: "Maru",
        title: "e-commerce"
    };

    res.render("index", testUser);
});

// Declaro el endpoint que utilizará multer
app.post('/single', uploader.single('myfile'), (req, res)=>{
    res.status(200).send({
        status: 'success',
        message: 'se subió correctamente'
    });
});


// Declaro el endpoint que utilizará socket.io
app.get('/chat', (req, res)=>{
    res.render('chat', {})
})

// Declaro el array donde se almacenarán los mensajes
let messages = [];

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');
    console.log(socket.id);

    // Almacenar y emitir los logs
    socket.on("message", data => {
        messages.push(data);
        io.emit('messageLogs', messages);
    });

    // Escuchar el usuario ingresado
    socket.on("authenticated", data => {
        socket.broadcast.emit("newUserConnected", data);
    });
});


// Llamo a los Routers y coloco los endpoint de inicio
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/static", express.static(__dirname + "/public"));