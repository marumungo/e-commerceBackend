const {Router} = require("express");

const router = Router();

// Endpoint para página de inicio de sesion
router.post("/setCookieUser", (req, res) => {
    const {username, email} = req.body;

    res.cookie(username, email, {maxAge: 1000000, signed: true}).send({mensaje: "seteado"});
})

// Endpoints para setear y obtener una cookie
router.get("/setCookie", (req, res) => {
    res.cookie("coderCookie", "Cookie muy poderosa", {maxAge: 1000000}).send("Cookie seteada");
});

router.get("/getCookie", (req, res) => {
    res.send(req.cookies);
});

// Endpoints para setear y obtener una cookie firmada
router.get("/signedCookie", (req, res) => {
    res.cookie("signedCookie", "Cookie muy poderosa", {maxAge: 1000000, signed: true}).send("Cookie firmada seteada");
});
router.get("/getSignedCookie", (req, res) => {
    res.send(req.signedCookies);
});

// Endpoints para borrar una cookie
router.get("/deleteCookie", (req, res) => {
    res.clearCookie("coderCookie").send("Cookie borrada");
});

module.exports = router;