const {Router} = require("express");
const {fork} = require("child_process");

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


function operacionCompleja() {
    let result = 0
    for (let i = 0; i < 9e9; i++) {
        result += i        
    }
    return result
}

// Pruebas de fork()
router.get('/block', (req, res)=>{
    const result = operacionCompleja()
    res.send(`el resultado de la operación es ${result}`)
})

router.get('/noblock', (req, res)=>{
    const child = fork('./src/routes/operacionCompleja.js')
    
    child.send('Inicia el processo de cáclculo')
    child.on('message', result => {
        res.send(`el resultado de la operación es ${result}`)
    })
})

router.get('/suma', (req, res)=>{    
    res.send(`HNola mundo`)
})

module.exports = router;