import { Router } from 'express';
import { carts, ProductManager } from "../data/data.js";
import { validateCart, validateProductExists } from '../middleware/middleware.js';

const router = Router();

const cartsManager = new ProductManager('./src/data/carts.json');

// Obtener todos los carritos
router.get('/', (req, res) => {
    res.status(200).send({ error: null, data: carts });
});

// Obtener un carrito por id
router.get('/:cid', validateCart, (req, res) => {
    const id = parseInt(req.params.cid);
    const cart = carts.find(cart => cart.id === id);
    res.status(200).send({ error: null, data: cart });
});

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    const maxId = (carts.length > 0) ? Math.max(...carts.map(element => +element.id)) : 0;

    const newCart = {
        id: maxId + 1,
        products: []
    };
    carts.push(newCart);

    await cartsManager.editProduct(carts);
    res.status(200).send({ error: null, data: newCart });
});

// Agregar un elemento al carrito
router.post('/:cid/product/:id', validateCart, validateProductExists, async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = carts.find(cart => cart.id === cartId);
    const productId = parseInt(req.params.id);

    let newProduct = cart.products.find(product => product.id === productId);

    //verifica si el producto ya existe en el carrito
    if (newProduct) {
        newProduct.quantity++;
    } else {
        newProduct = {
            id: productId,
            quantity: 1
        };
        cart.products.push(newProduct);
    }

    await cartsManager.editProduct(carts);
    res.status(200).send({ error: null, data: cart });
});

export default router;
