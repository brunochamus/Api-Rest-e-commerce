import CartService from "../../services/cartService.js";
import productsService from "../../services/productsService.js";

const cartService = new CartService();
const productService = new productsService();

export const addCartController = async (req, res, next) => {
    try {
        const cart = { products: [] };
        const cartId = await cartService.addCartService(cart);
        res.status(201).json({ message: 'Cart created successfully', cartId });
    } catch (error) {
        console.error('Error creating cart', error);
        res.status(500).json({ error: 'Internal server error' });
        next(error);
    }
}

export const getAllCartsController = async (req, res, next) => {
    try {
        const allCarts = await cartService.getAllCartsService();
        res.json(allCarts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        next(error);
    }
}

export const getCartByIdController = async (req, res, next) => {
    try {
        const cartId = req.params.cid;
        const products = await cartService.getCartByIdService(cartId);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        next(error);
    }
}

export const getProductInCartController = async (req, res, next) => {
    try {
        const cartId = req.params.cid;
        const products = await cartService.getProductInCartService(cartId);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        next(error);
    }
}

export const addProductToCartController = async (req, res, next) => {
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
        next(error);
    }
}

export const deleteProductOfCartController = async (req, res, next) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
    
        await cartService.deleteProductOfCartService(cid, pid);

        res.json({ message: 'Product removed from the cart' });
    } catch (error) {
        console.error('Error deleting product from the cart:', error);
        res.status(500).json({ error: 'Internal server error' });
        next(error)
    }
}

export const updateCartController = async (req, res, next) => {
    try{
        const cid = req.params.cid;
        const updateData = req.body;

        await cartService.updateCartService(cid, updateData);
        res.send('Updated successfully')
    }catch(error){
        console.error('Error updating cart', error);
        res.status(500).json({ error: 'Internal server error' });
        next(error);
    }
}

export const updateProductQuantityController = async (cid, pid, quantity) => {
    try {
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
    } catch (error) {
        console.error('Error updating cart', error);
        res.status(500).json({ error: 'Internal server error' });
        next(error);
    }
}

export const emptyCartController = async (req, res, next) => {
    try{
        const cid = req.params.cid;
    
        await cartService.emptyCartService(cid); 
        res.send('Updated successfully');
        
        }catch(error){
            console.error('Error when deleting cart', error);
            res.status(500).json({ error: 'Internal server error' });
            next(error)
        }
}

