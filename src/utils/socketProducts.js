const ProductDaoFile = require("../dao/file/productFile");

const productDao = new ProductDaoFile();

const socketProducts = async (io) => {
    const products = await productDao.getProducts();

    io.on("connection", socket => {
        console.log("Nuevo cliente conectado");

        socket.emit("products", products);

        socket.on("addProduct", data => {
            console.log(data);
            productDao.addProduct(data);
        })
    });
};

module.exports = {
    socketProducts
};