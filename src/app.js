import express from "express";
import { ProductManager } from "../productManager.js";

const app = express()
app.use(express.urlencoded({extended: true}));
const pm = new ProductManager();

app.get('/products', async (req, res) => {   
    const products = await pm.getProducts();
    const limit = req.query.limit;

    if(limit){
        return res.send(products.slice(0, limit))
    }else{
        res.send(products)
    }
})

app.get('/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid, 10);
    const prod = await pm.getProductsById(pid);
    
    if(prod){
        res.send(prod)
    }else{
        res.status(404).send();
    }

})


app.listen(8080, () => console.log('servidor iniciado en puerto 8080'))