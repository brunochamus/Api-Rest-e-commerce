import { Router } from "express";
const router = Router();
import { ProductManager } from "../../productManager.js";

const pm = new ProductManager();

router.get('/products/', async (req, res) => {   
    const products = await pm.getProducts();
    const limit = req.query.limit;

    if(limit){
        return res.send(products.slice(0, limit))
    }else{
        res.send(products)
    }
})

router.get('/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid, 10);
    const prod = await pm.getProductsById(pid);
    
    if(prod){
        res.send(prod)
    }else{
        res.status(404).send();
    }
})

router.post('/products/', async (req, res) => {
    const {title, description, price, thumbnail, code, stock} = req.body;
    res.send(await pm.addProduct(title, description, price, thumbnail, code, stock))
})

export default router;
