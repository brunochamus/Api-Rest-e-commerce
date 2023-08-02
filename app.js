class ProductManager {

    constructor(){
        this.products = [];
        this.autoId = 0;
    }

    addProduct(title, description, price, thumbnail, code, stock){

        const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: this.autoId + 1
        };

        const existingCode = this.products.find((product) => product.code === newProduct.code);
        if(existingCode){
            console.log("Error, codigo en uso")
        } else {
            this.products.push(newProduct);
            this.lastId++;
        }
    }


    getProducts(){
        console.log(this.products);
    }

    getProductsById(id){
        let searchId = this.products.find((i)=> i.id == id )
        if(searchId === undefined){
            console.log("Not Found")
        }else{
            return searchId;
        }
    }
}

const productManager = new ProductManager()

productManager.addProduct("producto 1", "se come", 100, "Sin imagen", "kdfk854", 8);
productManager.getProducts()
productManager.addProduct("producto 1", "se come", 100, "Sin imagen", "kdfk854", 8);
productManager.getProducts()
productManager.getProductsById(2)