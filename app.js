const fs = require('fs');
const { stringify } = require('querystring');

class ProductManager {

    constructor() {
        this.products = [];
        this.path = './products.json';
    }

    // Agregar productos    
    async addProduct(title, description, price, thumbnail, code, stock) {
        const newProduct = {
            title,
            description, 
            price,
            thumbnail,
            code,
            stock,
        };

        try {
            if (!fs.existsSync(this.path)) {
                const emptyArr = [];
                emptyArr.push({ ...newProduct, id: await this.getId() });

                await fs.promises.writeFile(this.path, JSON.stringify(emptyArr, null, '\t'));
            } else {
                const content = await this.getProducts();
                const repeatCode = content.some(e => e.code === code)
                repeatCode == true ? console.log ("Codigo repetido") : content.push({...newProduct,id: await this.getId()})
                await fs.promises.writeFile(this.path, JSON.stringify(content, null, '\n'))
            }
        } catch(err){
            console.log(err)
        } //SEGUIR POR GETPRODUCTS
    }

    async getId() {
        let data = await this.getProducts()
        return data.length + 1;
    }

    //Tomar producto
    async getProducts() {
        const gets = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        return gets
    }

    //Tomar producto por id
    async getProductsById(id) {
        let searchId = this.products.find((i) => i.id == id)
        if (!searchId) {
            console.log("Not Found")
        } else {
            return searchId;
        }
    }

    //Borrar producto
    async deleteProduct(id) {
        let i = this.products.findIndex(e => e.id === id);
        this.products.splice(i, 1);
    }

}

const productManager = new ProductManager()
productManager.addProduct("producto 1", "se come", 100, "Sin imagen", "kdfk854", 8);
productManager.getProducts()
productManager.addProduct("producto 2", "se come", 100, "Sin imagen", "fk854", 8);
productManager.getProducts()
productManager.getProductsById(2)