import CartRepository from "../repository/cartRepository.js";

const cartRepository = new CartRepository();

export default class CartService {
    //Tomar carritos
    async getAllCartsService(id) {
        try {
            const carts = await cartRepository.getRepository(id);
            return carts;
        } catch (error) {
            console.log('Error add cart', error);
        }
    }

    //Añadir carrito
    async addCartService(cart) {
        try {
            const newCart = await cartRepository.postRepository(cart);
            return newCart.id;
        } catch (error) {
            console.log('Error add cart', error);
        }
    }
    //Filtrar carrito por id
    async getCartByIdService(cid) {
        try {
            const cart = await cartRepository.getIdRepository({ _id: cid });
            return cart;
        } catch (error) {
            console.log('Error get id cart', error);
        }
    }
    //Tomar producto del carrito
    async getProductInCartService(cid) {
        try {
            const cart = await cartRepository.getRepository(cid);
            if (cart) {
                return cart.products;
            } else {
                console.log('Cart not found');
                return [];
            }
        } catch (error) {
            console.log('Error get product in cart', error);
        }
    }
    //Añadir producto al carrito
    async addProductToCartService(cid, pid, quantity) {
        try {
            const cartFind = await cartRepository.getRepository({ _id: cid });

            if (cartFind !== null) {
                const existingProduct = cartFind.products.findIndex((product) => product._id.toString() === pid);
                
                if (existingProduct !== -1) {
                    cartFind.products[existingProduct].quantity += quantity;
                }else {
                    cartFind.products.push({ pid, quantity });
                }
                await cartRepository.updateRepository({ _id: cid }, { products: cartFind.products });
                console.log('Product added to cart')
            } else {
                console.log('The cart was not found')
            }
        } catch (error) {
            console.log('Error updating cart', error);
        }
    }

    //Eliminar producto seleccionado del carrito
    async deleteProductOfCartService(cid, pid) {
        try {
            const result = await cartRepository.deleteProductRepository(
                { _id: cid },
                { $pull: { products: { _id: pid } } },
                { new: true }
            );
            if (result) {
                console.log('Product removed from the cart');
            } else {
                console.log('Product not found in the cart');
            }
        } catch (error) {
            console.log('Error when removing product from cart', error);
        }
    }

    //Actualizar array de productos
    async updateCartService(cid, updateData) {
        try {
            const data = await cartRepository.updateRepository({ _id: cid }, updateData)
            return data;
        } catch (error) {
            console.log('Error updating cart', error);
        }
    }

    //Actualizar cantidad de productos del carrito
    async updateProductQuantityService(cid, pid, quantity) {
        try {
            const cart = await cartRepository.getRepository(cid);
            if (!cart) {
                console.log("Cart not found");
            }
            const productToUpdate = cart.products.find(
                (product) => product._id.toString() === pid
            );
            if (!productToUpdate) {
                console.log("Product not found in cart");
            }
            productToUpdate.quantity = quantity;
            await cart.save();
            return cart;
        } catch (error) {
            console.log('Error updating product of cart', error);
        }
    }

    //Vaciar carrito
    async emptyCartService(cid) {
        try {
            const cartFind = await cartRepository.getRepository({ _id: cid });

            if (!cartFind) {
                console.log("Cart not found")
            }
            cartFind.products = [];
            await cartFind.save();
        } catch (error) {
            console.log('Error when emptying cart ', error);
        }
    }
}