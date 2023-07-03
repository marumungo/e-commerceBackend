class CartRepository {
    constructor(dao) {
        this.dao = dao;
    };

    getCarts = async () => {
        let result = await this.dao.getCarts();
        return result;
    };

    getCartById = async (cid) => {
        let result = await this.dao.getCartById(cid);
        return result;
    };

    addCart = async (newCart) => {
        let result = await this.dao.addCart(newCart);
        return result;
    }

    addCartById = async (cid, pid, quantity) => {
        let result = await this.dao.addCartById(cid, pid, quantity);
        return result;
    }

    updateCarts = async (cid, updatedProducts) => {
        let result = await this.dao.updateCarts(cid, updatedProducts);
        return result;
    }

    updateCartById = async (cid, pid, quantity) => {
        let result = await this.dao.updateCartById(cid, pid, quantity);
        return result;
    }

    deleteProductsCart = async (cid) => {
        let result = await this.dao.deleteProductsCart(cid);
        return result;
    }

    deleteCartById = async (cid, pid) => {
        let result = await this.dao.deleteCartById(cid, pid);
        return result;
    }
};

module.exports = CartRepository;