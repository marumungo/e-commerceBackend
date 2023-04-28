const {Schema, model} = require("mongoose");

const collection = "messages";

// Configuro el esquema del usuario
const messageSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    }
});

// Creo el modelo a traves del esquema
const messageModel = model(collection, messageSchema);

module.exports = {
    messageModel
};