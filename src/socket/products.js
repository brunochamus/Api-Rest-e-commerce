import ProductController from "../dao/controller/productController.js";
const pcontrollersocket = new ProductController()

const productEvents = (socketServer) => {
    socketServer.on("connection", async (socket) => {
        console.log('client connected with id', socket.id);

        const listadeproductos = await pcontrollersocket.getProducts()
        socket.emit("sendproducts", listadeproductos)

        socket.on("addProduct", async (obj) => {
            await pmanagersocket.addProduct(obj)
            const updateProducts = await pcontrollersocket.getProducts()
            socket.emit("sendproducts", updateProducts)
        });
    });
};

export default productEvents;