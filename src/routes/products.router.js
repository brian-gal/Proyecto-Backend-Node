import { Router } from 'express';
import productsController from '../dao/products.controller.js'; 

const router = Router();
const controller = new productsController();

// Obtener todos los productos o los productos de un determinado límite
router.get('/', async (req, res) => {
    const { limit, page, order, category, stock } = req.query;
    try {
        const products = await controller.getPaginated({ limit, page, order, category, stock });
        res.status(200).send({ error: null, data: products });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.get('/categories', async (req, res) => {
    try {
        const categories = await controller.getCategories();
        res.status(200).json({ data: categories });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Obtener los productos por id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const product = await controller.getID(id);
        res.status(200).send({ error: null, data: product });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        const data = await controller.add(req.body);
        res.status(201).send({ error: null, data });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await controller.update(id, req.body);
        res.status(200).send({ error: null, data });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await controller.delete(id);
        res.status(200).send({ error: null, data });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

export default router;
