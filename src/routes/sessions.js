const {Router} = require("express");
const {auth} = require("../middlewares/authentication");
const { userModel } = require('../manager/mongo/models/user.model');
const session = require('express-session');
const { createHash, isValidPassword } = require("../utils/bcryptHash");
const passport = require("passport");
const { generateToken } = require("../utils/jwt");

const router = Router();

// SESSION
// Endpoint para registrarse
// router.post("/register", async (req, res) => {
//     try {        
//         const { username, first_name, last_name, email, password } = req.body;
    
//         // Validar si ya existe el email
//         const existUser = await userModel.findOne({email});
//         if (existUser) {
//             return res.send({status: "error", message: "el email ya está registrado"});
//         }
    
//         const newUser = {
//             username,
//             first_name,
//             last_name,
//             email,
//             password: createHash(password)
//         }
//         let resultUser = await userModel.create(newUser);

//         let token = generateToken({
//             first_name: first_name,
//             last_name: last_name,
//             email: email
//         })

//         // res.redirect('/'); 
//         res.status(200).send({
//             status: "success",
//             message: "Usuario creado correctamente",
//             token
//         });

//     } catch (err) {
//         console.log(err);
//     }
// });

// // Endpoint para iniciar sesion
// router.post("/login", async(req, res) => { 
//     try {
//         const { email, password } = req.body;

//         // Validar que email y password NO esten vacíos
//         if (!email || !password) {
//             return res.send({status: "error", message: "El email y la contraseña son campos obligatorios!"});
//         }

//         // Validar que el usuario exista en la base de datos o que sea el especifico para ser admin
//         const userDB = await userModel.findOne({email});
//         if (!userDB) {
//                 if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
//                     req.session.user = {
//                         first_name: "Admin",
//                         last_name: "Coder",
//                         email: "adminCoder@coder.com",
//                         role: "admin"
//                     };
//                 } else {
//                     return res.send({status: "error", message: "No existe ese usuario"});
//                 }
//         } else {
//             req.session.user = {
//                 first_name: userDB.first_name,
//                 last_name: userDB.last_name,
//                 email: userDB.email,
//                 role: "user"
//             };

//         };
        
//         if(!isValidPassword(password, userDB)) {
//             return res.status(401).send({
//                 status: "error",
//                 message: "El usuario o contraseña son incorrectos",
//             })
//         };
        
//         const access_token = generateToken({
//             first_name: userDB.first_name,
//             last_name: userDB.last_name,
//             email: userDB.email
//         });

//         // res.redirect('/api/products'); 
//         res.send({
//             status: 'success',
//             message: 'login success',
//             access_token
//             // session: req.session.user
//         });    
//     } catch (err) {
//         console.log(err);
//     };
// });




// PASSPORT
// Endpoint para registrarse con passport
router.post("/register", passport.authenticate("register", {failureRedirect: "/api/sessions/failRegister"}), async (req, res) => {
    // res.send({status: "success", message: "El usuario se registró correctamente"});
    res.redirect("/api/sessions/login");
});

// Ruta de escape
router.get("/failRegister", async (req, res) => {
    res.send({status: "error", error: "Falló la autenticación"});
});

// Endpoint para iniciar sesion con passport
router.post("/login", passport.authenticate("login", {failureRedirect: "/api/sessions/failLogin"}), async (req, res) => {
    if (!req.user) {
        return res.status(401).send({status: "error", message: "Credencial inválida"});
    }
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: req.user.role
    }
    // res.send({status: "success", message: "Sesión iniciada"});
    res.redirect("/api/products");
});

// Ruta de escape
router.get("/failLogin", async (req, res) => {
    res.send({status: "error", error: "Falló la autenticación"});
});

// Endpoint para ingresar con Github con passport
router.get("/github", passport.authenticate("github", {scope: ["user: email"]}));

router.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/api/sessions/login"}), async (req, res) => {
    req.session.user = req.user;
    res.redirect("/api/products");
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

// Endpoint para restaurar la contraseña
router.post('/forgotPassword', async (req, res) => {
    const { email, password } = req.body;

    // Encontrar el usuario por correo electrónico
    const userDB = await userModel.findOne({ email });

    if (!userDB) {
        return res.status(401).send({status: 'error', message: 'El usuario no existe'})
    }    

    // Actualizar la contraseña del usuario
    userDB.password = createHash(password)
    await userDB.save()

    // res.status(200).json({status: 'success', message:'Contraseña actualizada correctamente'});
    res.redirect("/api/sessions/login");
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