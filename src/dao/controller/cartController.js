import CartService from "../../services/cartService.js";

const cartService = new CartService();

export default class CartController {
    async getAllCartsController() {
        return await cartService.getAllCartsService();
    }

    async addCartController(cart) {
        return await cartService.addCartService(cart);
    }

    async getCartByIdController(cid) {
        return await cartService.getCartByIdService(cid);
    }

    async getProductInCartController(cid) {
        return await cartService.getProductInCartService(cid);
    }

    async addProductToCartController(cid, pid, quantity) {
        return await cartService.addProductToCartService(cid, pid, quantity);
    }

    async deleteProductOfCartController(cid, pid) {
        return await cartService.deleteProductOfCartService(cid, pid);
    }

    async updateCartController(cid, updateData) {
        return await cartService.updateCartService(cid, updateData);
    }

    async updateProductQuantityController(cid, pid, quantity) {
        return await cartService.updateProductQuantityService(cid, pid, quantity);
    }

    async emptyCartController(cid) {
        return await cartService.emptyCartService(cid);
    }
}
