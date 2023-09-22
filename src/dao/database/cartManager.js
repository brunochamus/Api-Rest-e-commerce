import { cartModel } from "../models/cart.model.js";

export default class CartManager {
    async getAllCarts() {
        const carts = await cartModel.find().lean();
        return carts;
    }

    async addCart(cart) {
        const newCart = await cartModel.create(cart);
        return newCart.id;
    }

    async getCartById(cid) {
        const cart = await cartModel.find({ _id: cid });
        return cart;
    }

    async getProductInCart(cid) {
        const cart = await this.getCartById(cid);

        if (cart) {
            return cart.products;
        } else {
            console.log('Cart not found');
            return [];
        }
    }

    async addProductToCart(cid, pid, quantity) {
        const cartFind = await cartModel.findOne({ _id: cid });

        if (cartFind !== null) {
            const existingProduct = cartFind.products.findIndex((product) => product.pid === pid);

            if (existingProduct !== -1) {
                cartFind.products[existingProduct].quantity += quantity;
            } else {
                cartFind.products.push({ pid, quantity });
            }

            await cartModel.updateOne({ _id: cid }, { products: cartFind.products });

            console.log('Product added to cart')
        } else {
            console.log('This cart does not exist')
        }
    }
}
