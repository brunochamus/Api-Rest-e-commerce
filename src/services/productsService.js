import productsModel from '../dao/models/product.model.js'

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

        const repeatCode = await productsModel.find({ code: code });
        if (repeatCode.length > 0) {
            console.log("Repeat code")
            return;
        }
        try {
            const productCreate = await productsModel.create(newProduct);
            return productCreate;
        } catch (error) {
            console.log("Error when adding product", error)
        }
    }

    async getProductsService() {
        const data = await productsModel.find().lean();
        return data;
    }

    async getProductsByIdService(id) {
        const data = await productsModel.find({ _id: id }).lean();
        return data;
    }
    
    async deleteProductsService(pid) {
        try {
            const data = await productsModel.deleteOne({ _id: pid });
            return data;
        } catch (error) {
            console.log("Error when deleting product", error)
        }
    }

    async updateProductsService(pid, updateData) {
        try {
            const data = await productsModel.updateOne({ _id: pid }, updateData);
            return data;
        } catch (error) {
            console.log("Error updating product", error)
        }
    }

    async pageProductsService(modelQuery, modelLimit, modelPage, modelSort) {
        try {
            const products = await productsModel.paginate(modelQuery,
                {
                    limit: modelLimit,
                    page: modelPage,
                    sort: modelSort,
                    lean: true,
                }
            );
    
            const response = {
                status: 'success',
                payload: products.docs,
                totalDocs: products.totalDocs,
                limit: products.limit,
                totalPages: products.totalPages,
                page: products.page,
                pagingCounter: products.pagingCounter,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
            };
            return response;

        } catch (error) {
            console.error("Error en la función pageProducts:", error);
            throw error;
        }
    }
}