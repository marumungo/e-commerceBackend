const { winstonLogger } = require("../config/loggers");
const { userModel } = require("../dao/dataBase/models/user.model");
const { userService } = require("../service/index.service");

class UserController {
    getUsers = async (req, res) => {
        try {
            let getUsers = await userService.getProducts();
            res.status(200).send({
                status: "success",
                payload: getUsers
            });
        } catch (error) {
            res.status(500).send({ error: error.message });
        };
    };

    // GET que trae los usuarios a partir del userModel y el paginate
    getUsersPaginate = async (req, res) => {
        try {
            const {page=1} = req.query
            let users = await userModel.paginate({}, {limit: 10, page: page, lean: true})
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = users
    
            res.render('users',{
                status: 'success',
                users: docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage
            })
        } catch (error) {
            winstonLogger.error(error)
        };
    };

    // GET que devuelve un usuario a partir de su email
    getUserByEmail = async (req, res) => {
        try {
            const { email } = req.params;
            const getUserByEmail = await userService.getUserByEmail(email);
            
            // Validación de si existe o no el email
            if (!getUserByEmail) {
                return res.status(400).send({error: "No existe un usuario con ese email"});
            } else {
                res.status(200).send({
                    status: "success",
                    payload: getUserByEmail
                });
            }
        } catch (error) {
            res.status(400).send({error: error.message});
        }; 
    };

    // GET que devuelve un usuario a partir de su username
    getUserByUsername = async (req, res) => {
        try {
            const { username } = req.params;
            const getUserByUsername = await userService.getUserByUsername(username);
            
            // Validación de si existe o no el username
            if (!getUserByUsername) {
                return res.status(400).send({error: "No existe un usuario con ese username"});
            } else {
                res.status(200).send({
                    status: "success",
                    payload: getUserByUsername
                });
            }
        } catch (error) {
            res.status(400).send({error: error.message});
        }; 
    };

    // GET que devuelve un usuario a partir de su id
    getUserById = async (req, res) => {
        try {
            const { id } = req.params;
            const getUserById = await userService.getUserById(id);
            
            // Validación de si existe o no la id
            if (!getUserById) {
                return res.status(400).send({error: "No existe un usuario con esa ID"});
            } else {
                res.status(200).send({
                    status: "success",
                    payload: getUserById
                });
            }
        } catch (error) {
            res.status(400).send({error: error.message});
        }; 
    };
    
    // POST que agrega un usuario a la base de datos a partir del userModel
    createUsers = async (req, res) => {
        try {
            let user = req.body;
    
            if(!user.nombre || !user.apellido) {
                return res.status(400).send({status:"error", mensaje: "Todos los campos son obligatorios"});
            };
    
            const newUser = {
                first_name: user.nombre,
                last_name: user.apellido,
                email: user.email
            };

            let addUser = await userService.addUser(newUser);
            res.status(200).send({
                status: "success",
                payload: addUser
            });
        } catch (error) {
            winstonLogger.error(error);
        };
    };
    
    // PUT que actualiza un usuario en la base de datos a partir del userModel
    updateUserById = async (req, res) => {
        try {
            const { id } = req.params;
            const user = req.body;
    
            if(!user.nombre || !user.apellido) {
                return res.status(400).send({status:"error", mensaje: "Todos los campos son obligatorios"});
            }
    
            let updateUser = {
                first_name: user.nombre,
                last_name: user.apellido,
                email: user.email
            }
    
            const updatedUser = await userService.updateUserById(id, updateUser);
            res.send({
                status: "success",
                payload: updatedUser
            });
        } catch (error) {
            winstonLogger.error(error);
        };
    };

    // PUT que actualiza el rol de un usuario
    updateRoleUser = async (req, res) => {
        try {
            const { id } = req.params;
            const getUserById = await userService.getUserById(id);

            // Validación de si existe o no la id
            if (!getUserById) {
                return res.status(400).send({ error: "No existe un usuario con esa ID" });
            }

            let newRole;
            if (getUserById.role === "user") {
                newRole = "premium";
            } else if (getUserById.role === "premium") {
                newRole = "user";
            }

            const updatedUser = await userService.updateUserById(id, { role: newRole });

            res.send({
                status: "success",
                payload: getUserById
            });
        } catch (error) {
            winstonLogger.error(error);
        };
    };
    
    // DELETE que elimina un usuario de la base de datos a partir del userModel
    deleteUsers = async (req, res) => {
        try {
            const { id } = req.params;

            const deleteUserById = await userService.deleteUserById(id);

            res.status(200).send({
                status: "success",
                payload: deleteUserById
            }); 
        } catch (error) {
            winstonLogger.error(error);
        };
    };
};

module.exports = new UserController();
