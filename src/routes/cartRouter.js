import { Router } from "express";
import cartManager from "../cartManager.js";

const router = Router();
const carts = new cartManager();

router.get('/test', (req, res)=> {
    res.send("ok")
})

router.post('/cart/', async (req, res) => {
    res.send(await carts.addCart())
})

router.get('/cart/', async (req, res)=> {
    res.send(await carts.getCart());
})

export default router;