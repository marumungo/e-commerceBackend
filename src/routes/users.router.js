const { Router } = require("express");
const { getUsers, createUsers, deleteUsers, getUsersPaginate, updateRoleUser, getUserById, updateUserById } = require("../controllers/users.controller");

// Declaro y llamo al Router
const router = Router();

// GET que trae los usuarios a partir del userModel y el paginate
router.get('/', getUsersPaginate);

// GET que devuelve un usuario a partir de su id
router.get('/:id', getUserById);

// POST que agrega un usuario a la base de datos a partir del userModel
router.post("/", createUsers);

// PUT que actualiza un usuario en la base de datos a partir del userModel
router.put("/:id", updateUserById);

// PUT que actualiza el rol de un usuario
router.put("/premium/:id", updateRoleUser);

// DELETE que elimina un usuario de la base de datos a partir del userModel
router.delete("/:id", deleteUsers);


module.exports = router;