import fs from 'fs'

export default class cartManager {

    constructor(){
        this.path = './cart.json'
    }

    async getCart(){
        const data = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
        return data;
    }

    async getId(){
        const data = await this.getCart();
        return data.length + 1;
    }

    async writeCart(cart){
        await fs.promises.writeFile(this.path, JSON.stringify(cart))
    }

    async addCart(){
            const cartOld = this.getCart();
            const id = this.getId();
            const cartConcat = [{id:id, products: []}, ...cartOld]
            await this.writeCart(cartConcat);
            return console.log('Carrito agregado')
    }
}
