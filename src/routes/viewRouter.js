import { Router } from "express";
import ProductManager from "../dao/database/productManager.js";


const router = Router();
const pm = new ProductManager();

router.get('/', async (req, res) => {
    const products = await pm.getProducts();
    res.render('home', {products});
});

router.get('/realtimeproducts', (req, res)=> {
    res.render('realtimeproducts')
})

router.get('/chat', (req, res)=> {
    res.render('chat', {})
});

router.get('/products', (req,res)=> {
    res.render('products', {products})
})

export default router;
