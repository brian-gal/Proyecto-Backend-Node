import { Router } from 'express';

const router = Router();

// Renderizar la vista de la página de inicio con los productos
router.get('/cart/:idCart', async (req, res) => {
    const idCart = req.params.idCart;

    try {
        const productResponse = await fetch('http://localhost:8080/api/cart/' + idCart);
        const productData = await productResponse.json();
        const cart = productData.data;

        // Renderiza la vista 'cart' y pasa el objeto 'cart' como contexto
        res.status(200).render('cart', { data: cart });
    } catch (err) {
        console.error("Error al obtener los productos:", err);
        res.status(500).send("Error interno del servidor");
    }
});


router.get('/products', async (req, res) => {
    try {
        const productResponse = await fetch('http://localhost:8080/api/products');
        const productData = await productResponse.json();
        const allProducts = productData.data;

        const categoryResponse = await fetch('http://localhost:8080/api/products/categories');
        const categoryData = await categoryResponse.json();
        const categories = categoryData.data;

        const cartResponse = await fetch('http://localhost:8080/api/cart');
        const cartData = await cartResponse.json();
        const cart = cartData.data;
console.log(cart);

        res.status(200).render('products', { products: allProducts, categories: categories, cart: cart });
    } catch (err) {
        console.error("Error al obtener los productos:", err);
        res.status(500).send("Error interno del servidor");
    }
});

export default router;