const { ContactDto } = require("../dto/contact.dto");
const { contactService } = require("../service/index.service");

class ContactController {
    getContacts = async (req, res) => {
        res.send({
            status: "success",
            payload: "contacts get"
        });
    };
    createContacts = async (req, res) => {
        let {name, last_name, phone} = req.body;
        // let newContact = new ContactDto({name, last_name, phone});
        let result = await contactService.create(newContact);

        res.send({
            status: "success",
            payload: result
        });
    };
};

module.exports = new ContactController();