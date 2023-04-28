const {Schema, model} = require("mongoose");

const collection = "carts";

// Configuro el esquema del usuario
const cartSchema = new Schema({
    products: {
        type: Array,
        required: true
    }
});

// Creo el modelo a traves del esquema
const cartModel = model(collection, cartSchema);

module.exports = {
    cartModel
};