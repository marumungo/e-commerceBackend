const {Schema, model} = require("mongoose");

// Creo la colección en la que se almacenarán los documentos
const collection = "orders";

// Configuro el esquema de la orden
const orderSchema = new Schema({
    name: String,
    size: {
        type: String,
        enum: ["small", "medium", "large"],
        default: "medium"
    },
    price: Number,
    quantity: Number,
    date: Date
});

// Creo el modelo a traves del esquema
const orderModel = model(collection, orderSchema);

module.exports = {
    orderModel
};