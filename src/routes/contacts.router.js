const { Router } = require("express");
const contactController = require("../controllers/contacts.controllers");

// Declaro y llamo al Router
const router = Router();

router.get('/', contactController.getContacts);
router.post('/', contactController.createContacts);

module.exports = router;