const {Schema, model} = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

// Creo la colección en la que se almacenarán los documentos
const collection = "users";

// Configuro el esquema del usuario
const userSchema = new Schema({
    username: String,
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: String,
    role: {
        type: String,
        default: "user"
    },
    gender: String
});

userSchema.plugin(mongoosePaginate);

// Creo el modelo a traves del esquema
const userModel = model(collection, userSchema);

module.exports = {
    userModel
};