import productsService from "../../services/productsService.js";

const productService = new productsService();

export default class ProductManager {

    async addProduct(title, description, category, price, thumbnail, code, stock) {
        return await productService.addProductSevice(title, description, category, price, thumbnail, code, stock)
    }

    async getProducts() {
        return await productService.getProductsService();
    }

    async getProductsById(id) {
        return await productService.getProductsByIdService(id);
    }

    async deleteProducts(pid) {
        return await productService.deleteProductsService(pid);
    }

    async updateProducts(pid, updateData) {
        return await productService.updateProductsService(pid, updateData);
    }

    async pageProducts(modelQuery, modelLimit, modelPage, modelSort) {
        return await productService.pageProductsService(modelQuery, modelLimit, modelPage, modelSort)
    }
}
