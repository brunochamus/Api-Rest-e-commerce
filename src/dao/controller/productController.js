import productsService from "../../services/productsService.js";

const productService = new productsService();

export default class ProductController {

    async addProductController(title, description, category, price, thumbnail, code, stock) {
        return await productService.addProductService(title, description, category, price, thumbnail, code, stock)
    }

    async getProductsController() {
        return await productService.getProductsService();
    }

    async getProductsByIdController(id) {
        return await productService.getProductsByIdService(id);
    }

    async deleteProductsController(pid) {
        return await productService.deleteProductsService(pid);
    }

    async updateProductsController(pid, updateData) {
        return await productService.updateProductsService(pid, updateData);
    }

    async pageProductsController(modelQuery, modelLimit, modelPage, modelSort) {
        return await productService.pageProductsService(modelQuery, modelLimit, modelPage, modelSort)
    }
}
