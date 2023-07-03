const { v4: uuidv4 } = require('uuid');
const { cartModel } = require("../dao/dataBase/models/cart.model");
const { cartService, productService, ticketService } = require("../service/index.service");

class CartController {
    // GET que devuelve todos los carritos
    getCarts = async (req, res) => {
        try {
            let carts = await cartService.getCarts();
            res.status(200).send({
                status: "success",
                payload: carts
            });
        } catch (error) {
            res.status(400).send(error);
        }; 
    };

    // GET que muestra un carrito según su id
    getCartById = async (req, res) => {
        try {
            // Busco el carrito con esa id
            const { cid } = req.params;
    
            let result = await cartService.getCartById(cid);
            if (!result) {
                return res.status(404).send({status: "error", message: "No se encuentra el carrito"});
            };
    
            res.status(200).send({status: "success", payload: result});
        } catch (error) {
            console.log(error);
        };
    };

    // POST que crea un carrito
    addCart = async (req, res) => {
        try {
            let cart = req.body;
        
            const newCart = {
                products: [cart]
            }
            
            let result = await cartService.addCart(newCart);
    
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
        };
    };

    // POST que agregue un producto por id, a un carrito segun su id
    addCartById = async (req, res) => {
        try {
            // Busco el carrito con esa id
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const product = {
                id: pid,
                quantity
            }
    
            // En caso de que el producto exista, incremento su cantidad
            const cartToUpdate = await cartService.addCartById(cid, pid, quantity);
            
            if (cartToUpdate) {
                res.send("Cantidad actualizada");
            } else {
                // En caso de que el producto NO exista
                await cartModel.findByIdAndUpdate(
                    {_id: cid},
                    {$push: {products: {product: pid, quantity: 1}}},
                    {new: true, upsert: true}
                );
            }
    
            res.send("Producto añadido");
    
            res.send({
                status: "success",
                payload: cartToUpdate
            });
        } catch (error) {
            console.log(error);
        };
    };

    // PUT que actualiza el carrito con un array de productos
    updateCarts = async (req, res) => {
        try {
            const { cid } = req.params;
            const { products } = req.body;
    
            // Mapear el array de objetos para crear un nuevo array de subdocumentos completos
            const updatedProducts = products.map(({ product, quantity }) => ({ product, quantity }));
    
            let result = await cartService.updateCarts(cid, updatedProducts);
    
            res.send({
                status: "success",
                payload: result
            });
        } catch (error) {
            console.log(error);
        };
    };

    // PUT que actualiza la cantidad de un producto de un carrito segun su id
    updateCartById = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
    
            const cartToUpdate = await cartService.updateCartById(cid, pid, quantity);
    
            res.send({
                status: "success",
                payload: cartToUpdate
            });
        } catch (error) {
            console.log(error);
        };
    };

    // DELETE que borra los productos de un carrito segun su id
    deleteProductsCart = async (req, res) => {
        try {
            const { cid } = req.params;
    
            let result = await cartService.deleteProductsCart(cid);
    
            res.send({
                status: "success",
                payload: result
            });
        } catch (error) {
            console.log(error);
        };
    };

    // DELETE que borra un producto de un carrito segun su id
    deleteCartById = async (req, res) => {
        try {
            const { cid, pid } = req.params;
    
            let result = await cartService.deleteCartById(cid, pid);
    
            res.send({
                status: "success",
                payload: result
            });
        } catch (error) {
            console.log(error);
        };
    };


    // POST que crea el ticket
    addTicket = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await cartService.getCartById(cid);
        
            const productsWithoutStock = [];
            const productsToUpdate = [];
        
            for (const item of cart.products) {
                if (item.product) {
                    const product = item.product;
                    const quantity = item.quantity;
                    const pid = item.product._id;
                    let stock = item.product.stock;
            
                    if (quantity > stock) {
                        productsWithoutStock.push(product);
                    } else {
                        const updatedStock = stock - quantity;
                        productsToUpdate.push({ pid, stock: updatedStock });
                    }
                }
            };
        
            if (productsWithoutStock.length > 0) {
                res.send({
                    status: "error",
                    message: "Algunos de los productos no tienen suficiente stock",
                    productsWithoutStock
                });
            } else {
                for (const product of productsToUpdate) {
                    await productService.updateProductById(product.pid, { stock: product.stock });
                }
        
                const amount = cart.products.reduce((total, item) => {
                    return total + (item.product && item.product.price ? item.product.price : 0) * item.quantity;
                }, 0);
    
                const code = uuidv4();

                const ticket = {
                    code: code,
                    purchase_datetime: Date(),
                    amount: amount,
                    purchaser: req.user && req.user.email ? req.user.email : "Usuario desconocido"
                }

                await ticketService.addTicket(ticket);
        
                await cartService.deleteProductsCart(cid);
        
                res.send({
                    status: "success",
                    payload: ticket,
                });
            };
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = new CartController();