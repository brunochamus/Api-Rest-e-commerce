import {existsSync} from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises';

class ProductManager {

    products;
    static id = 1;

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
            if (!existsSync(this.path)) {
                const newList = [];
                newList.push(newProduct)

                await writeFile(this.path, JSON.stringify(newList, null, '\t'))

            } else {
                const repeatCode = this.products.some(e => e.code == newProduct.code)
                repeatCode == true ? console.log("El codigo esta repetido") : this.products.push(newProduct)
                const contentObj = await this.getProducts();
                contentObj.push(newProduct);
                await writeFile(this.path, JSON.stringify(contentObj, null, '\t'));

            }
        } catch(error) {
            console.log(error);
        }
    }

    async deleteProducts(id) {
        const product = await this.getProducts()
        const productNoId = product.filter((producto) => producto.id !== id)
        await writeFile(this.path, JSON.stringify(productNoId, null, '\t'));
    }


    async getProducts() {
        const content = await readFile(this.path, 'utf-8')
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
        await writeFile(this.path, JSON.stringify(data))

    }
}

/*
const funcionAsincrona = async () => {
    const productManager = new ProductManager()
    await productManager.addProduct("producto 1", "cubiertos", 100, "Sin imagen", "abc123", 8);
    await productManager.addProduct("producto 2", "vasos", 500, "Sin imagen", "abc456", 8);
    await productManager.addProduct("producto 3", "platos", 120, "Sin imagen", "abc789", 8);
    await productManager.addProduct("producto 4", "ollas", 1300, "Sin imagen", "def123", 8);
    await productManager.addProduct("producto 5", "jarra", 200, "Sin imagen", "def456", 8);
    await productManager.addProduct("producto 6", "mantel", 50, "Sin imagen", "def789", 8);
    await productManager.addProduct("producto 7", "cuchilla", 300, "Sin imagen", "ghi123", 8);
    await productManager.addProduct("producto 8", "microondas", 3000, "Sin imagen", "ghi456", 8);
    await productManager.addProduct("producto 9", "cocina", 4000, "Sin imagen", "k854", 8);
    await productManager.addProduct("producto 10", "heladera", 7000, "Sin imagen", "ghi789", 8);
}


funcionAsincrona();
*/
export { ProductManager } ;