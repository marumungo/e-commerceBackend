const fs = require('fs');
const { Router } = require("express");
const { cartModel } = require("../manager/mongo/models/cart.model")

const path = "./manager/carts.json";

// Declaro y llamo al Router
const router = Router();

// Declaro un array donde se almacenarán los carritos (FILESYSTEM)
// let carts = [];

// POST
router.post("/", async (req, res) => {
    try {
        let cart = req.body;
    
        // Verificar que aunque sea haya un producto y que este almacenado en un array
        // if (!cart.products) {
        //     return res.status(400).send({status: "error", mensaje: "Debe agregar aunque sea un producto"});
        // } else if (!Array.isArray(cart.products)) {
        //     return res.status(400).send({status: "error", mensaje: "Los productos deben estar en un array"});
        // }
    
        // Generar un id autoincrementable
        // if (carts.length === 0) {
        //     cart.id = 1;
        // } else {
        //     cart.id = carts[carts.length - 1].id + 1;
        // }
    
        const newCart = {
            products: [cart]
        }
        
        let result = await cartModel.create(newCart);

        res.status(200).send({result});
        
        // Agregar el producto al array y al JSON (FILESYSTEM)
        // carts.push(cart);
        // res.status(200).send({cart});
        // fs.writeFileSync(path, JSON.stringify(carts, null, 2), 'utf-8');
    } catch (error) {
        console.log(error);
    }
});

// GET que muestra un carrito según su id
router.get("/:cid", async (req, res) => {
    try {
        // Busco el carrito con esa id
        const { cid } = req.params;
        // const parseId = parseInt(cid);
        // const cartById = carts.find(cart => cart.id === parseId);

        // Validación de si existe o no la id
        // if (!cartById) {
        //     return res.status(400).send({error: "No existe un carrito con esa ID"});
        // }

        let result = await cartModel.findOne({_id: cid})

        res.send({
            status: "success",
            payload: result
        });
        // res.send({cartById});
    } catch (error) {
        console.log(error);
    }
});

// POST que agregue un producto por id, a un carrito segun su id
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        // Busco el carrito con esa id
        const { cid, pid } = req.params;
        const parseId = parseInt(pid);
        // const parseId = parseInt(cid);
        // const cartById = carts.find(cart => cart.id === parseId);
    
        // Validación de si existe o no un carrito con esa id
        // if (!cartById) {
        //     return res.status(400).send({error: "No existe un carrito con esa ID"});
        // }
    
        // Validación de si el producto ya está en ese carrito, en caso de que si, aumentar su cantidad en 1, sino, crearlo
        // const parseId2 = parseInt(pid);
        // const productIndex = cartById.products.findIndex(product => product.product === parseId2);
        
        // if (productIndex < 0) {
        //     cartById.products.push({ product: parseId2, quantity: 1});
        //     res.status(200).send({status: "success", message: "Producto agregado al carrito!", payload: cartById});
        // } else {
        //     cartById.products[productIndex].quantity += 1;
        //     res.status(200).send({status: "success", message: "Se ha sumado otro producto igual!", payload: cartById});
        // }

        let cartToReplace = {
            $push: {products: {"product": parseId}}
        }
    
        let result = await cartModel.updateOne({_id: cid}, cartToReplace)
    
        res.send({
            status: "success",
            payload: result
        });
        // fs.writeFileSync(path, JSON.stringify(carts, null, 2), 'utf-8');
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;