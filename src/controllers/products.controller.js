const { productModel } = require("../dao/dataBase/models/product.model");
const { productService } = require("../service/index.service");
const { Error } = require("../utils/CustomError/Errors");
const { CustomError } = require("../utils/CustomError/CustomError");
const { generateProductErrorInfo } = require("../utils/CustomError/info");
const { winstonLogger } = require("../config/loggers");

class ProductController {
    // GET en el que se verán todos los productos
    getProducts = async (req, res) => {
        try {
            let getProducts = await productService.getProducts();
            res.status(200).send({
                status: "success",
                payload: getProducts
            });

        } catch (error) {
            res.status(500).send({ error: error.message });
        };
    };

    // GET en el que se verán todos los productos usando paginate
    getProductsPaginate = async (req, res) => {
        // Declaro un limite de 10 y pagina 1 por defecto (en caso de que no se reciba por query). Permito que se reciba por query un filtro y un orden por precio
        try {
            const {page = 1, limit = 10, query, sort} = req.query

            // Declaro queryOptions y filtro los productos segun categoria
            let queryOptions = {}; 
            if (query) {
                queryOptions = { category: query.toLowerCase() };
            }

            // Declaro sortOptions y valido que asc y desc correspondan a un orden especifico
            let sortOptions = {};
            if (sort === "asc") {
                sortOptions = { price: 1 };
            } else if (sort === "desc") {
                sortOptions = { price: -1};
            }
            
            let products = await productModel.paginate(queryOptions, {limit: limit, page: page, sort: sortOptions, lean: true});
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = products;
            
            res.render('products', {
                status: 'success',
                // user: req.session.user,
                products: docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage, 
                totalPages
            });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    // GET que devuelve un producto a partir de su id
    getProductById = async (req, res) => {
        try {
            const { id } = req.params;
            const getProductById = await productService.getProductById(id);
            
            // Validación de si existe o no la id
            if (!getProductById) {
                return res.status(400).send({error: "No existe un producto con esa ID"});
            } else {
                // return res.render("individualProduct", { product: getProductById});
                res.status(200).send({
                    status: "success",
                    payload: getProductById
                });
            }
        } catch (error) {
            res.status(400).send({error: error.message});
        }; 
    }
    
    // POST que agrega nuevos productos al array
    addProduct = async (req, res, next) => {
        try {
            const {title, description, price, category, stock, code, imageUrl} = req.body;
            
            if (!title || !description || !price || !category || !stock || !code || !imageUrl) {
                CustomError.createError({
                    name: 'Product creation error',
                    cause: generateProductErrorInfo({
                        title,
                        description,
                        price,
                        category,
                        stock,
                        code,
                        imageUrl
                    }),
                    message: 'Error trying to create product',
                    code: Error.INVALID_TYPE_ERROR
                });
            };

            let owner
            if (req.session.user.email) {
                owner = req.session.user.email
            } else {
                owner = "admin"
            }
            
            const product = {
                title,
                description,
                price,
                category,
                stock,
                code,
                imageUrl,
                owner: owner
            };

            let addProduct = await productService.addProduct(product);
            res.status(200).send({
                status: "success",
                payload: addProduct
            });
        } catch (error) {
            winstonLogger.error(error);
        }; 
    };
    
    // PUT que actualiza un producto según su id
    updateProducts = async (req, res) => {
        try {
            const { id } = req.params;
            const updateProduct = req.body;
    
            const updatedProduct = await productService.updateProductById(id, updateProduct);
            res.status(200).send({
                status: "success",
                payload: updatedProduct
            });
        } catch (error) {
            res.status(400).send({error: error.message});
        }; 
    };
    
    // DELETE que elimina un producto según su id
    deleteProducts = async (req, res) => {
        const { id } = req.params;

        const getProductById = await productService.getProductById(id);

        if (getProductById.owner !== req.session.user.email && req.session.user.role !== "admin") {
            return res.status(400).send({error: "Debes ser admin o creador del producto para poder eliminarlo"});
        };
        
        const deleteProductById = await productService.deleteProductById(id);
        
        res.status(200).send({
            status: "success",
            payload: deleteProductById
        });    
    };
};

module.exports = new ProductController();