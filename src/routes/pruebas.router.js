const {Router} = require("express");
const {fork} = require("child_process");
const { sendMail } = require("../utils/sendMail");
const { sendWhatsapp, sendSms } = require("../utils/sendSms");
const { passportCall } = require("../passport-jwt/passportCall");
const { authorization } = require("../passport-jwt/authorizationJwtRole");
const { generateUser } = require("../utils/generateUserFaker");
const compression = require('express-compression');
const { generateProducts } = require("../utils/generateProductFaker");

const router = Router();

// Declaro el endpoint que utilizará socket.io y llamo a la funcion
router.get('/chat', passportCall("jwt"), authorization("user"), (req, res)=>{
    res.render('chat', {})
});

// Endpoint para página de inicio de sesion
router.post("/setCookieUser", (req, res) => {
    const {username, email} = req.body;

    res.cookie(username, email, {maxAge: 1000000, signed: true}).send({mensaje: "seteado"});
});

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
    let result = 0;
    for (let i = 0; i < 9e9; i++) {
        result += i        
    };
    return result;
};

// Pruebas de fork()
router.get('/block', (req, res) => {
    const result = operacionCompleja();
    res.send(`el resultado de la operación es ${result}`);
});

router.get('/noblock', (req, res) => {
    const child = fork('./src/routes/operacionCompleja.js');
    
    child.send('Inicia el processo de cáclculo');
    child.on('message', result => {
        res.send(`el resultado de la operación es ${result}`);
    });
});

router.get('/suma', (req, res) => {    
    res.send(`Hola mundo`);
});

router.get('/sms', async (req, res) => {
    await sendSms("Mariana", "Mungo");
    // await sendWhatsapp("Mariana", "Mungo");
    res.send('SMS enviado');
});


router.get('/mail', async (req, res) => {
    console.log(__dirname);
    let destino = 'marumungo@gmail.com';
    let subject = 'Correo de prueba';
    let html = `<div>
                    <h1>Esto es una prueba</h1>
                </div>`;
    let attachments = [{
        filename:'nodejs.png',
        path: __dirname + '/nodejs.png',
        cid:'nodejs'
    }];
    let result = await sendMail(destino, subject, html, attachments);
    res.send('Email enviado');
});

router.get('/mocks', (req, res)=> {
    let users = [];
    for (let i = 0; i < 100; i++) {
        users.push(generateUser());       
    };
    res.send({
        status: 'success',
        payload: users
    });
});

router.get('/mockingproducts', (req, res)=> {
    let products = [];
    for (let i = 0; i < 100; i++) {
        products.push(generateProducts());       
    };
    res.send({
        status: 'success',
        payload: products
    });
});

// GZIP
// router.use(compression());

// BROTLI
router.use(compression({
    brotli: {
        enabled: true,
        zlib: {}
    }
}));

router.get('/stringmuylargo', (req, res)=> {
    let string = `Hola Coders, soy una string ridículamente largo`;

    for(let i=0; i<5e4; i++){
        string += `Hola Coders, soy una string ridículamente largo`;
    };

    res.send(string);
});


module.exports = router;