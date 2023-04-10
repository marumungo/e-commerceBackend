const fs = require('fs');
const { Router } = require("express");

const path = "./routes/products.json";

// Declaro y llamo al Router
const router = Router();

// Declaro los productos en forma de objetos, dentro de un array
let products = [
    {"title": "Zapatos", "description": "Con taco alto", "price": 3500, "category": "Calzados","thumbail": ["imagen1.com"], "code": 253, "stock": 45, "id": 1},
    {"title": "Pollera", "description": "Con volados", "price": 2600, "category": "Partes de abajo","thumbail": ["imagen2.com"], "code": 178, "stock": 28, "id": 2},
    {"title": "Jean", "description": "De color azul", "price": 2410, "category": "Partes de abajo","thumbail": ["imagen3.com"], "code": 345, "stock": 12, "id": 3},
    {"title": "Remera", "description": "Escote en v", "price": 1700, "category": "Partes de arriba","thumbail": ["imagen4.com"], "code": 56, "stock": 39, "id": 4},
    {"title": "Blusa", "description": "Con cuello alto", "price": 3100, "category": "Partes de arriba","thumbail": ["imagen5.com"], "code": 124, "stock": 24, "id": 5},
    {"title": "Pantalón cargo", "description": "Tiro alto", "price": 4280, "category": "Partes de abajo","thumbail": ["imagen6.com"], "code": 176, "stock": 53, "id": 6},
    {"title": "Saco", "description": "Abrigado de color beige", "price": 7240, "category": "Abrigos","thumbail": ["imagen7.com"], "code": 67, "stock": 26, "id": 7},
    {"title": "Sandalias", "description": "Abiertas con cierre", "price": 3520, "category": "Calzados","thumbail": ["imagen8.com"], "code": 89, "stock": 62, "id": 8},
    {"title": "Corset", "description": "Sin tirantes", "price": 5470, "category": "Partes de arriba","thumbail": ["imagen9.com"], "code": 53, "stock": 19, "id": 9},
    {"title": "Top", "description": "Escote corazón", "price": 1390, "category": "Partes de arriba","thumbail": ["imagen10.com"], "code": 25, "stock": 36, "id": 10}
]

// GET en el que se verán todos los productos
router.get("/", (req, res) => {
    fs.writeFileSync(path, JSON.stringify(products, null, 2), 'utf-8');
    res.send({status: "success", payload: products});
});

// GET que devuelve un producto a partir de su id
router.get("/:id", (req, res) => {
    // Busco el producto con esa id
    const { id } = req.params;
    const parseId = parseInt(id);
    const productById = products.find(product => product.id === parseId);

    // Validación de si existe o no la id
    if (!productById) {
        return res.status(400).send({error: "No existe un producto con esa ID"});
    } else {
        res.send({productById});
    }
});

// POST que agrega nuevos productos al array
router.post("/", (req, res) => {
    let product = req.body;
    const productIndex = products.findIndex(product => product.code === product.code);

    // Validar que no se repita el campo “code” y que todos los campos sean obligatorios
    if (product.title === "" || product.description === "" || typeof product.price !== "number" || product.category === "" || product.thumbail === "" || typeof product.code !== "number" || typeof product.stock !== "number") {
        return res.status(400).send({status: "error", mensaje: "Se necesitan todos los campos!"});
    } else if (productIndex >= 0) {
        return res.status(400).send({status: "error", mensaje: "El producto ya está agregado"});
    }

    // Generar un id autoincrementable
    if (products.length === 0) {
        product.id = 1;
    } else {
        product.id = products[products.length - 1].id + 1;
    }

    // Agregar el producto al array
    products.push(product);
    fs.writeFileSync(path, JSON.stringify(products, null, 2), 'utf-8');
    res.status(200).send({product});
});

// PUT que actualiza un producto según su id
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const parseId = parseInt(id);
    const updateProduct = req.body

    // Buscar el producto con esa id, y actualizar sus datos (menos el id)
    const productIndex = products.findIndex(product => product.id === parseId);
    if (productIndex >= 0) {
        products[productIndex] = {id: parseId, ...updateProduct};
        res.status.send({updateProduct});
    } else {
        return res.status(400).send({status: "error", mensaje: "No existe el producto a actualizar"});
    }
});

// DELETE que elimina un producto según su id
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const parseId = parseInt(id);

    // Buscar el producto con esa id, y eliminarlo
    const productIndex = products.findIndex(product => product.id === parseId);
        if (productIndex >= 0) {
            products.splice(productIndex, 1);
            fs.writeFileSync(path, JSON.stringify(products, null, 2), 'utf-8');
            res.send({status: "success", mensaje: "Producto eliminado con éxito"});
        } else {
            return res.status(400).send({status: "error", mensaje: "No existe el producto a eliminar"});
        }
})

module.exports = router;


