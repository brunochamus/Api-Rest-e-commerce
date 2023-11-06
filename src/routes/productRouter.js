import { Router } from "express";
const router = Router();
import productsService from "../services/productsService.js";

const productService = new productsService();


router.get('/products/', async (req, res) => {
    const { limit, page, sort, query } = req.query;

    const sortObject = {
        asc: { price: 1 },
        desc: { price: -1 },
    };

    const modelQuery = query ? JSON.parse(query) : {};
    const modelLimit = limit ? parseInt(limit, 10) : 10;
    const modelPage = page ? parseInt(page, 10) : 1;
    const modelSort = sortObject[sort] ?? undefined;

    const product = await productService.pageProductsService(modelQuery, modelLimit, modelPage, modelSort);
    res.send(product)
})



router.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const prod = await productService.getProductsByIdService(pid);

    if (prod) {
        res.send(prod)
    } else {
        res.status(404).send();
    }
})

router.post('/products/', async (req, res) => {
    const { title, description, category, price, thumbnail, code, stock } = req.body;

    if (productService) {
        try {
            const newProduct = await productService.addProductSevice(title, description, category, price, thumbnail, code, stock);
            res.send(newProduct);
        } catch (error) {
            res.status(500).send("Error adding product");
        }
    } else {
        res.status(400).send("Incomplete or no product manager");
    }
});

router.put('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const update = req.body;

    await productService.updateProductsService(pid, update);

    res.send('Updated successfully')
})

router.delete('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    await productService.deleteProductsService(pid);
    res.send('Delete Product')
})

export default router;
