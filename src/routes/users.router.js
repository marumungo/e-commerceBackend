const { Router } = require("express");
const { getUsers, updateUsers, createUsers, deleteUsers } = require("../controllers/users.controller");

// Declaro y llamo al Router
const router = Router();

// GET que trae los usuarios a partir del userModel y el paginate
router.get('/', getUsers)

// POST que agrega un usuario a la base de datos a partir del userModel
router.post("/", createUsers);

// PUT que actualiza un usuario en la base de datos a partir del userModel
router.put("/:uid", updateUsers);

// DELETE que elimina un usuario de la base de datos a partir del userModel
router.delete("/:uid", deleteUsers);

module.exports = router;