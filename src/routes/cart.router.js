import { Router } from 'express';
import cartsController from '../dao/cart.controller.js'; // Asegúrate de importar tu controlador


const router = Router();
const controller = new cartsController();


// Obtener todos los carritos
router.get('/', async (req, res) => {
    const carts = await controller.get();
    res.status(200).send({ error: null, data: carts });
});

// Obtener un carrito por id
router.get('/:cid', async (req, res) => {
    const id = req.params.cid;
    const cart = await controller.getId(id);
    res.status(200).send({ error: null, data: cart });
});

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    const newCart = await controller.addCart();
    res.status(200).send({ error: null, data: newCart });
});

// actualizar el producto si ya existe
router.put('/:cid/products/:pid', async (req, res) => {
    const quantity = req.body.quantity || 1;
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const updatedCart = await controller.addUpdate(cartId, productId, quantity);
    res.status(200).send({ error: null, data: updatedCart });
});

// Agrega un producto al carrito
router.put('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const { productId, quantity } = req.body;

    try {
        const add = await controller.add(cartId, productId, quantity);
        res.status(200).send({ error: null, data: add });
    } catch (error) {
        res.status(500).send({ error: "Error al agregar el producto", data: null });
    }
});


// Eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const updatedCart = await controller.deleteProduct(cartId, productId);
    if (updatedCart) {
        res.status(200).send({ error: null, data: updatedCart });
    } else {
        res.status(404).send({ error: 'Carrito no encontrado' });
    }
});

// Eliminar todos los productos del carrito al borrar el carrito
router.delete('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const updatedCart = await controller.deleteAllProducts(cartId);
    res.status(200).send({ error: null, data: updatedCart });
});

export default router;
