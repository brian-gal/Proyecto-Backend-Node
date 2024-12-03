import { Router } from 'express';
import cartsController from '../dao/cart.controller.js';
import productsController from '../dao/products.controller.js'; 

const router = Router();
const controllerCart = new cartsController();
const controllerProducts = new productsController();

//vista de carrito
router.get('/cart/:idCart', async (req, res) => {
    const idCart = req.params.idCart;

    try {
        const cart = await controllerCart.getId(idCart);
        res.status(200).render('cart', { data: cart });
    } catch (err) {
        console.error("Error al obtener los productos:", err);
        res.status(500).send("Error interno del servidor");
    }
});

//vista de productos
router.get('/products', async (req, res) => {
    try {
        const { limit, page, order, category, stock } = req.query;

        //carga la lista de productos
        const allProducts = await controllerProducts.getPaginated({ limit, page, order, category, stock });

        //carga la lista de categorias
        const categories = await controllerProducts.getCategories();
        
        //carga la lista de carritos disponibles
        const cart = await controllerCart.get();

        res.status(200).render('products', { products: allProducts, categories: categories, cart: cart });
    } catch (err) {
        console.error("Error al obtener los productos:", err);
        res.status(500).send("Error interno del servidor");
    }
});

export default router;