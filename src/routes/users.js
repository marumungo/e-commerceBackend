const { Router } = require("express");
const { userModel } = require("../manager/mongo/models/user.model");

// Declaro y llamo al Router
const router = Router();

// GET que trae los usuarios a partir del userModel y el paginate
router.get('/', async (req, res)=>{
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
        console.log(error)
    }
})


// POST que agrega un usuario a la base de datos a partir del userModel
router.post("/", async (req, res) => {
    try {
        let user = req.body;

        if(!user.nombre || !user.apellido) {
            return res.status(400).send({status:"error", mensaje: "Todos los campos son obligatorios"});
        }

        const newUser = {
            first_name: user.nombre,
            last_name: user.apellido,
            email: user.email
        }

        let result = await userModel.create(newUser);

        res.status(200).send({result});
    } catch (error) {
        console.log(error);
    }
});

// PUT que actualiza un usuario en la base de datos a partir del userModel
router.put("/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        const user = req.body;

        if(!user.nombre || !user.apellido) {
            return res.status(400).send({status:"error", mensaje: "Todos los campos son obligatorios"});
        }

        let userToReplace = {
            first_name: user.nombre,
            last_name: user.apellido,
            email: user.email
        }

        let result = await userModel.updateOne({_id: uid}, userToReplace);

        res.send({
            status: "success",
            payload: result
        });
    } catch (error) {
        console.log(error);
    }
});

// DELETE que elimina un usuario de la base de datos a partir del userModel
router.delete("/:uid", async (req, res) => {
    try {
        const { uid } = req.params;

        let result = await userModel.deleteOne({_id: uid});

        res.send({
            status: "success",
            payload: result
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;