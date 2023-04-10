const express = require("express");

// Llamo a express
const app = express();

// Declaro a los Routers
const cartsRouter = require("./routes/carts");
const productsRouter = require("./routes/products");
const { uploader } = require('./utils/multer');

// Lectura de código compatible
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Llamo a los Routers y coloco los endpoint de inicio
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/static", express.static(__dirname + "/public"));


// Declaro el puerto en el que se ejecutará el código
const PORT = 8080;

app.listen(PORT, () => {
    console.log("Escuchando puerto 8080");
})