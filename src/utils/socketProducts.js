const { ProductManagerFile } = require("../manager/productManagerFile");

const productManager = new ProductManagerFile();

const socketProducts = async (io) => {
    const products = await productManager.getProducts();

    io.on("connection", socket => {
        console.log("Nuevo cliente conectado");

        socket.emit("products", products);

        socket.on("addProduct", data => {
            console.log(data);
            productManager.addProduct(data);
        })
    });
};

module.exports = {
    socketProducts
};