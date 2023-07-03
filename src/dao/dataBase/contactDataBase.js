const { contactModel } = require("./models/contact.model");

class ContactDaoDataBase {
    constructor(){
        this.contactModel = contactModel
    };
    get  = async () => this.contactModel.find({});
    create = async (newContact) => this.contactModel.create(newContact);
};

module.exports = ContactDaoDataBase;
