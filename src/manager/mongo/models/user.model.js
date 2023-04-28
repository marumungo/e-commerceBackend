const {Schema, model} = require("mongoose");

const collection = "users";

// Configuro el esquema del usuario
const userSchema = new Schema({
    first_name: String,
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// Creo el modelo a traves del esquema
const userModel = model(collection, userSchema);

module.exports = {
    userModel
};