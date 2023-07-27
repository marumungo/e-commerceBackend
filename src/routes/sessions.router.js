const {Router} = require("express");
const {auth} = require("../middlewares/authentication.middleware");
const passport = require("passport");
const { passportCall } = require("../passport-jwt/passportCall");
const { authorization } = require("../passport-jwt/authorizationJwtRole");
const { registerSession, loginSession, loginCookie, registerPassport, loginPassport, registerPassportEscape, loginPassportEscape, githubCallback, privateAdmin, logoutSession, forgotPassword, resetPassword, sessionCounter, roleValidator } = require("../controllers/sessions.controller");
const { authToken } = require("../utils/jwt");

const router = Router();

// SESSION
// Endpoint para registrarse
router.post("/register", registerSession);
            
// Endpoint para iniciar sesion
router.post('/login', loginCookie);

// Validar el rol
router.get('/current', passportCall("jwt"), authorization('admin'), roleValidator);


// PASSPORT
// Endpoint para registrarse con passport
// router.post("/register", passport.authenticate("register", {failureRedirect: "/api/sessions/failRegister"}), registerPassport);

// // Ruta de escape
// router.get("/failRegister", registerPassportEscape);

// Endpoint para iniciar sesion con passport
// router.post("/login", passport.authenticate("login", {failureRedirect: "/api/sessions/failLogin"}), loginPassport);

// // Ruta de escape
// router.get("/failLogin", loginPassportEscape);


// Endpoint para ingresar con Github con passport
router.get("/github", passport.authenticate("github", {scope: ["user: email"]}));

router.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/api/sessions/login"}), githubCallback);


// Endpoint privado para admins
router.get("/privada", auth, privateAdmin);

// Endpoint para eliminar la sesion
router.get("/logout", logoutSession);

// Endpoint para recuperar la contraseña
router.post('/forgotPassword', forgotPassword);

// Endpoint para restaurar la contraseña
router.post('/resetPassword', resetPassword);

// Endpoint para contar la cantidad de veces que se ingresó al sito
router.get("/counter", sessionCounter);

module.exports = router;