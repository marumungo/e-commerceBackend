const { Router } = require("express");
const { getUsers, updateUsers, createUsers, deleteUsers, getUsersPaginate } = require("../controllers/users.controller");

// Declaro y llamo al Router
const router = Router();

// GET que trae los usuarios a partir del userModel y el paginate
router.get('/', getUsersPaginate);

// POST que agrega un usuario a la base de datos a partir del userModel
router.post("/", createUsers);

// PUT que actualiza un usuario en la base de datos a partir del userModel
router.put("/:id", updateUsers);

// DELETE que elimina un usuario de la base de datos a partir del userModel
router.delete("/:id", deleteUsers);

module.exports = router;