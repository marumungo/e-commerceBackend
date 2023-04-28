const {Schema, model} = require("mongoose");

const collection = "products";

// Configuro el esquema del usuario
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    }
});

// Creo el modelo a traves del esquema
const productModel = model(collection, productSchema);

module.exports = {
    productModel
};