import { productsModel } from "../models/product.model.js";

export default class ProductManager {

    async addProduct(title, description, category, price, thumbnail, code, stock) {
        const newProduct =  {
            title,
            description,
            category,
            price,
            thumbnail,
            code,
            stock,
        };

        const repeatCode = await productsModel.find({code : code});
        if(repeatCode.length > 0){
            console.log("Repeat code")
            return;
        }
        try{
            const productCreate = await productsModel.create(newProduct);
            return productCreate;
        }catch(error){
            console.log("Error when adding product",error)
        }
    }

    async getProducts(){
        const data = await productsModel.find().lean();
        return data;
    }

    async getProductsById(id){
        const data = await productsModel.find({_id : id}).lean();
        return data;
    }

    async deleteProducts(pid){
        try{
            const data = await productsModel.deleteOne({_id: pid});
            return data;
        }catch(error){
            console.log("Error when deleting product",error)
        }
    }

    async updateProducts(pid, updateData){
        try{
        const data = await productsModel.updateOne({_id : pid}, updateData);
        return data;
        }catch(error){
            console.log("Error updating product",error)
        }
    }

    async pageProducts(pageId){
        try{
        let result = await productsModel.paginate(
            {},
            {
                page: pageId,
                limit: 5,
                lean: true,
            }
        );
        return result;
        }catch(error){
            console.log(error,"Pagination error")
        }
    } 
}
