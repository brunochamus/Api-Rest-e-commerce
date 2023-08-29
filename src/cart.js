import fs from "fs"

export default class Cart {

    constructor() {
        this.path = './src/cart.json'
    }

    async getCarts() {
        const data = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        return data;
    }

    async getId() {
        const autoId = await this.getCarts();
        return autoId.length + 1;
    }

    async addCart(newCart) {
        newCart.id = await this.getId();
        const data = await this.getCarts();
        data.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(data))
    }

    async getIdCart(id) {
        const data = await this.getCarts();
        const dataFind = data.find((cart) => cart.id === id)
        return dataFind;
    }

    async addProductCart(pid, cid, product) {
        try {
            const carts = this.getCarts();
            const selectCart = carts[cid - 1];

            if (selectCart) {
                const cartProduct = selectCart.products || [];
                const findProd = cartProduct.find((prod) => prod.id === pid);

                findProd ? findProd.quantity++ : cartProduct.push({ ...product, id: pid, quantity: 1 });

                await fs.promises.writeFile(this.path, JSON.stringify(carts));
            } else {
                console.log('Error not found');
            }
        } catch (error) {
            console.log('There was an error adding the product', error)
        }
    }
}
