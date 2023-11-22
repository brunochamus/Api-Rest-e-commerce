import ProductRepository from '../repository/productRepository.js';

const productRepository = new ProductRepository();

export default class productsService {
    async addProductService(title, description, category, price, thumbnail, code, stock) {
        const newProduct = {
            title,
            description,
            category,
            price,
            thumbnail,
            code,
            stock,
        };

        const repeatCode = await productRepository.getRepository({ code: code });
        if (repeatCode.length > 0) {
            console.log("Repeat code")
            return;
        }
        try {
            const productCreate = await productRepository.postRepository(newProduct);
            return productCreate;
        } catch (error) {
            console.log("Error when adding product", error)
        }
    }

    async getProductsService() {
        const data = await productRepository.getRepository();
        return data;
    }

    async getProductsByIdService(pid) {
        try {
            const data = await productRepository.getRepository({ _id: pid })
            return data;
        } catch (error) {
            console.error("Error id:", error);
        }
    }

    async deleteProductsService(pid) {
        try {
            const data = await productRepository.deleteRepository({ _id: pid });
            return data;
        } catch (error) {
            console.log("Error when deleting product", error)
        }
    }

    async updateProductsService(pid, updateData) {
        try {
            const data = await productRepository.updateRepository({ _id: pid }, updateData);
            return data;
        } catch (error) {
            console.log("Error updating product", error)
        }
    }

    async pageProductsService(modelQuery, modelLimit, modelPage, modelSort) {
        try {
            const page = await productRepository.pageRepository(modelQuery, modelLimit, modelPage, modelSort);
            return page;

        } catch (error) {
            console.error("error in pageProducts function:", error);
            throw error;
        }
    }

    async getFakerService() {
        try {
            let products = [];
            for(let i = 0; i < 100; i++){
                let product = await productRepository.getFaker()
                products.push(product)
            }
            return products;
        } catch (error) {
            console.error("error in getFake function:", error);
        }
    }
}
