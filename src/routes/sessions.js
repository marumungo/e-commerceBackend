const {Router} = require("express");
const {auth} = require("../middlewares/authentication");
const { userModel } = require('../manager/mongo/models/user.model');
const session = require('express-session');

const router = Router();

// Endpoint para registrarse
router.post("/register", async (req, res) => {
    try {        
        const { username, first_name, last_name, email, password } = req.body;
    
        // Validar si ya existe el email
        const existUser = await userModel.findOne({email});
        if (existUser) {
            return res.send({status: "error", message: "el email ya está registrado"});
        }
    
        const newUser = {
            username,
            first_name,
            last_name,
            email,
            password
        }
        let resultUser = await userModel.create(newUser);
        
        res.redirect('/'); 
        
        res.status(200).send({
            status: "success",
            message: "Usuario creado correctamente",
        });

    } catch (err) {
        console.log(err);
    }
});

// Endpoint para iniciar sesion
router.post("/login", async(req, res) => { 
    try {
        const { email, password } = req.body;

        // Validar que email y password NO esten vacíos
        if (!email || !password) {
            return res.send({status: "error", message: "El email y la contraseña son campos obligatorios!"});
        }

        // Validar que el usuario exista en la base de datos o que sea el especifico para ser admin
        const userDB = await userModel.findOne({email, password});
        if (!userDB) {
            if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
                req.session.user = {
                    first_name: "Admin",
                    last_name: "Coder",
                    email: "adminCoder@coder.com",
                    role: "admin"
                };
            } else {
                return res.send({status: "error", message: "No existe ese usuario"});
            }
        } else {
            req.session.user = {
                first_name: userDB.first_name,
                last_name: userDB.last_name,
                email: userDB.email,
                role: "user"
            };
        }
        
        res.redirect('/api/products');   
    } catch (err) {
        console.log(err);
    }
});


// Endpoint privado para admins
router.get("/privada", auth, (req, res) => {
    res.send("Esto solo puede verlo un admin");
});

// Endpoint para eliminar la sesion
router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send({status: "error", error: err});
        }
        res.redirect("/");
    });
});

// Endpoint para contar la cantidad de veces que se ingresó al sito
router.get("/counter", (req, res) => {
    if (req.session.counter) {
        req.session.counter ++;
        res.send(`Se ha visitado el sitio ${req.session.counter} veces`);
    } else {
        req.session.counter = 1;
        res.send("Bienvenido");
    };
});

module.exports = router;