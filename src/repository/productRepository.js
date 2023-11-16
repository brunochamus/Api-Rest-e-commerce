import productsModel from "../dao/models/product.model.js";

export default class ProductRepository {
    async getRepository(pid, code) {
        try {
            const get = productsModel.find(pid, code).lean();
            return get;
        } catch (error) {
            console.error("error when taking products", error);
            throw error;
        }
    }

    async postRepository(product) {
        try {
            const add = await productsModel.create(product);
            return add;
        } catch (error) {
            console.error("error filtering id", error);
            throw error;
        }
    }

    async deleteRepository(pid) {
        try {
            const get = await productsModel.deleteOne({ _id: pid });
            return get;
        } catch (error) {
            console.error("error when deleting product", error);
            throw error;
        }
    }

    async updateRepository(pid, updateData) {
        try {
            const data = await productsModel.updateOne({ _id: pid }, updateData);
            return data;
        } catch (error) {
            console.log("Error updating product", error)
        }
    }

    async pageRepository(modelQuery, modelLimit, modelPage, modelSort) {
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
