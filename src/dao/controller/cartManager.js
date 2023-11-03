import cartModel from "../models/cart.model.js";
import CartService from "../../services/cartService.js";

const cartService = new CartService();

export default class CartManager {
    async getAllCarts() {
        return await cartService.getAllCartsService();
    }

    async addCart(cart) {
        return await cartService.addCartService(cart);
    }

    async getCartById(cid) {
        return await cartService.getCartByIdService(cid);
    }

    async getProductInCart(cid) {
        return await cartService.getProductInCartService(cid);
    }

    async addProductToCart(cid, pid, quantity) {
        return await cartService.addProductToCartService(cid, pid, quantity);
    }

    async deleteProductOfCart(cid, pid) {
        return await cartService.deleteProductOfCartService(cid, pid);
    }

    async updateCart(cid, updateData) {
        return await cartService.updateCartService(cid, updateData);
    }

    async updateProductQuantity(cid, pid, quantity) {
        return await cartService.updateProductQuantityService(cid, pid, quantity);
    }

    async emptyCart(cid) {
        return await cartService.emptyCartService(cid);
    }
}
