const { productModel } = require("./models/product.model");

class ProductManagerMongo {
    async getProducts() {
        try {
            return await productModel.find({});
        } catch (error) {
            return new Error(error);
        }
    }
    async getProductById(id) {
        try {
            return await productModel.findOne({_id: id});
        } catch (error) {
            return new Error(error);
        }
    }
    async addProduct(product) {
        try {
            return await productModel.create(product);
        } catch (error) {
            return new Error(error);
        }
    }
    async updateProductById(uid, updatedProduct) {
        try {
            return await productModel.updateOne({_id: uid}, updatedProduct);
        } catch (error) {
            return new Error(error);
        }
    }
    async deleteProductById(uid) {
        try {
            return await productModel.deleteOne({_id: uid});
        } catch (error) {
            return new Error(error);
        }
    }
}

module.exports = ProductManagerMongo;