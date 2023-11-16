import { Router } from "express";
import { addCartController, addProductToCartController, deleteProductOfCartController, emptyCartController, getAllCartsController, getCartByIdController, getProductInCartController, updateCartController, updateProductQuantityController } from "../dao/controller/cartController.js";

const router = Router();

// Crear nuevo carrito
router.post('/cart/',addCartController);

//Todos los carritos
router.get('/cart', getAllCartsController);

// Listado de productos según carrito
router.get('/cart/:cid', getCartByIdController);

//Agregar productos al carrito
router.post('/cart/:cid/product/:pid', addProductToCartController);

//Eliminar producto de carrito
router.delete('/cart/:cid/product/:pid', deleteProductOfCartController);

//Vaciar carrito
router.delete('/cart/:cid', emptyCartController);

//Actualizar productos de carrito
router.put('/cart/:cid', updateCartController);

//Actualizar quantity de producto
router.put('/cart/:cid/products/:pid', updateProductQuantityController);

export default router;
