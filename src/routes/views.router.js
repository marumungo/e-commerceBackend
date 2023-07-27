const { Router } = require("express");
const { uploader } = require("../utils/multer");

const router = Router();


// Declaro el endpoint que utilizará multer
router.post('/single', uploader.single('myfile'), (req, res)=>{
    res.status(200).send({
        status: 'success',
        message: 'se subió correctamente'
    });
});

// Declaro el endpoint que utilizará handlebars
router.get("/vista", (req, res) => {
    let testUser = {
        name: "Maru",
        title: "e-commerce"
    };

    res.render("index", testUser);
});

// Endpoints en tiempo real
router.get('/realtimeproducts', (req, res) => {
    res.render("realTimeProducts", {});
});

// Declaro el endpoint que renderizará la página de inicio
router.get("/", (req, res) => {
    res.render("login", {});
});

router.get("/api/sessions/login", (req, res) => {
    res.render("login", {});
});

router.get("/api/sessions/register", (req, res) => {
    res.render("register", {});
});

router.get("/api/sessions/forgotPassword", (req, res) => {
    res.render("forgotPassword", {});
});

router.get("/api/sessions/resetPassword", (req, res) => {
    res.render("resetPassword", { token: req.query.token });
});

// Declaro el endpoint de páginas no existentes
router.get("*", async (req, res) => {
    res.status(404).send("404 not found");
});

module.exports = router;