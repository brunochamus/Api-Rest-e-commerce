import { Router } from "express";
import CartService from "../services/cartService.js";
import productsService from "../services/productsService.js";

const cartService = new CartService();
const productService = new productsService()
const router = Router();

router.get('/test/', (req, res) => {
    res.send('test')
})

// Crear nuevo carrito
router.post('/cart/', async (req, res) => {
    try {
        const cart = { products: [] };
        const cartId = await cartService.addCartService(cart);
        res.status(201).json({ message: 'Cart created successfully', cartId });
    } catch (error) {
        console.error('Error creating cart', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Todos los carritos
router.get('/cart', async (req, res) => {
    try {
        const allCarts = await cartService.getAllCartsService();
        res.json(allCarts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Listado de productos según carrito
router.get('/cart/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const products = await cartService.getProductInCartService(cartId);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Agregar productos al carrito
router.post('/cart/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity || 1;

        if (quantity <= 0) {
            return res.status(400).json({ error: 'Quantity must be greater than 0' });
        }

        const cart = await cartService.getCartByIdService(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        const product = await productService.getProductsByIdService(pid);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await cartService.addProductToCartService(cid, pid, quantity);
        res.json({ message: 'Product added to cart successfully' });

    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Eliminar producto de carrito
router.delete('/cart/:cid/product/:pid', async (req,res)=> {

    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
    
        await cartService.deleteProductOfCartService(cid, pid);

        res.json({ message: 'Product removed from the cart' });
    } catch (error) {
        console.error('Error deleting product from the cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//Vaciar carrito
router.delete('/cart/:cid', async (req,res)=> {
    try{
    const cid = req.params.cid;

    await cartService.emptyCartService(cid); 
    res.send('Updated successfully');
    
    }catch(error){
        console.error('Error when deleting cart', error);
        res.status(500).json({ error: 'Internal server error' });
    }

})


//Actualizar array de productos de carrito
router.put('/cart/:cid', async (req, res)=> {
    try{
        const cid = req.params.cid;
        const updateData = req.body;

        await cartService.updateCartService(cid, updateData);
        res.send('Updated successfully')

    }catch(error){
        console.error('Error updating cart', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/*
{
"products" :[{
    "_id":"650b7c649e00d1c4dab5fae2",
    "quantity": 10
}]
}
*/

//Actualizar quantity de producto
router.put('/cart/:cid/products/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;

    const cart = await cartService.getCartByIdService(cid);

    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    const product = await productService.getProductsByIdService(pid);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }console.log();

    await cartService.updateProductQuantityService(cid, pid, quantity);
    console.log(quantity);
    res.json({ message: 'Product quantity modified', productId: pid, cartId: cid });
});

export default router;