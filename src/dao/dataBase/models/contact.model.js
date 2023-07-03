const { Schema, model } = require('mongoose')

const collection = 'contacts'

const ContactSchema = Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    active: Boolean,
    phone: String
});

let contactModel = model(collection, ContactSchema);

module.exports = {
    contactModel
};
