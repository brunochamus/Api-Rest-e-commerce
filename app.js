const fs = require('fs');

class ProductManager {

    products;
    static id = 0;

    constructor() {
        this.products = [];
        this.path = './products.json';
    }
    async addProduct(title, description, price, thumbnail, code, stock) {
        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id++,
        };

        try {
            if (!fs.existsSync(this.path)) {
                const newList = [];
                newList.push(newProduct)

                await fs.promises.writeFile(this.path, JSON.stringify(newList, null, '\t'))

            } else {
                const repeatCode = this.products.some(e => e.code == newProduct.code)
                repeatCode == true ? console.log("El codigo esta repetido") : this.products.push(newProduct)
                const contentObj = await this.getProducts();
                contentObj.push(newProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(contentObj, null, '\t'));

            }
        } catch(error) {
            console.log(error);
        }
    }

    async deleteProducts(id) {
        const product = await this.getProducts()
        const productNoId = product.filter((producto) => producto.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(productNoId, null, '\t'));
    }


    async getProducts() {
        const content = await fs.promises.readFile(this.path, 'utf-8')
        const contentObj = JSON.parse(content)
        return contentObj;
    }

    async getProductsById(id) {
        let data = await this.getProducts()
        let productFind = data.find(e => e.id == id)
        return productFind === undefined ? console.log("Not found") : productFind
    }

    async updateProducts(id , product){
        let data = await this.getProducts()
        let i = data.findIndex(e => e.id === id)
        product.id = id
        data.splice(i,1,product)
        await fs.promises.writeFile(this.path, JSON.stringify(data))

    }
}

const funcionAsincrona = async () => {
    const productManager = new ProductManager()
    await productManager.addProduct("producto 1", "este es un productazo", 100, "Sin imagen", "kdf854", 8);
    await productManager.addProduct("producto 2", "este es un producto", 1500, "Sin imagen", "kjf9", 8);
    await productManager.addProduct("producto 3", "no sabemos que es", 10, "Sin imagen", "sdf54", 8);
    await productManager.addProduct("producto 4", "se come", 300, "Sin imagen", "k854", 8);
    await productManager.updateProducts(2,{"title": "producto nuevo","description": "soy nuevo","price": 98,"thumbnail": "Sin imagen","code": "lp89","stock": 8,"id": 4})
    await productManager.deleteProducts(3);
}

funcionAsincrona();
