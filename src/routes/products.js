const fs = require('fs');
const { Router } = require("express");
const productManagerMongo = require("../manager/mongo/product.mongo");

const productManager = new productManagerMongo();

// CODIGO PARA TRABAJAR CON FILESYSTEM
// const { ProductManagerFile } = require("../manager/file/productManagerFile");
// const productManager = new ProductManagerFile();

// Declaro y llamo al Router
const router = Router();

// GET en el que se verán todos los productos
router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.send({status: "success", payload: products});
    } catch (error) {
        res.status(400).send({error: error.message});
    }; 
});

// GET que devuelve un producto a partir de su id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const getProductById = await productManager.getProductById(id);
    
        // Validación de si existe o no la id
        if (!getProductById) {
            return res.status(400).send({error: "No existe un producto con esa ID"});
        } else {
            return res.send({getProductById});
        }
    } catch (error) {
        res.status(400).send({error: error.message});
    }; 
});

// POST que agrega nuevos productos al array
router.post("/", async (req, res) => {
    try {
        const product = req.body;

        let addProduct = await productManager.addProduct(product);
        res.status(200).send({
            status: "success",
            payload: addProduct
        });
    } catch (error) {
        res.status(400).send({error: error.message});
    };    
});

// PUT que actualiza un producto según su id
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateProduct = req.body;

        const updatedProduct = await productManager.updateProductById(id, updateProduct);
        res.status(200).send({updatedProduct});
    } catch (error) {
        res.status(400).send({error: error.message});
    };    
});

// DELETE que elimina un producto según su id
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deleteProductById = await productManager.deleteProductById(id);
    res.send({deleteProductById});
});

module.exports = router;


