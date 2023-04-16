const { Router } = require("express");
const { uploader } = require("../utils/multer");

const router = Router();

router.get("/", (req, res) => {

});

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

module.exports = router;