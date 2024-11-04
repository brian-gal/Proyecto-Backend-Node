import { Router } from 'express';

const router = Router();

// Renderizar la vista de la página de inicio con los productos
router.get('/cart', (req, res) => {
    res.status(200).render('cart');
});

router.get('/products', async (req, res) => {
    try {
        const productResponse = await fetch('http://localhost:8080/api/products');
        const productData = await productResponse.json();
        const allProducts = productData.data;

        const categoryResponse = await fetch('http://localhost:8080/api/products/categories');
        const categoryData = await categoryResponse.json();
        const categories = categoryData.data;

        res.status(200).render('products', { products: allProducts, categories: categories });
    } catch (err) {
        console.error("Error al obtener los productos:", err);
        res.status(500).send("Error interno del servidor");
    }
});

export default router;