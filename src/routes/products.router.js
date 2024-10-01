import { Router } from 'express';
import { products } from "../data/products.js";
import { validateProduct, validateProductExists, validateUpdateProduct } from '../middleware/middleware.js';

const router = Router();

// Obtener todos los productos o los productos de un determinado límite
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);
    if (limit) {
        res.status(200).send({ error: null, data: products.slice(0, limit) });
    } else {
        res.status(200).send({ error: null, data: products });
    }
});

// Obtener los productos por id
router.get('/:id', validateProductExists, (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(product => product.id === id);
    res.status(200).send({ error: null, data: product });
});

// Crear un nuevo producto
router.post('/', validateProduct, (req, res) => {
    const { title, description, code, price, stock, category } = req.body;
    const maxId = products.length > 0 ? Math.max(...products.map(element => +element.id)) : 0;

    const newProduct = {
        id: maxId + 1,
        title,
        description,
        code,
        price: parseFloat(price),
        status: true,
        stock: parseInt(stock),
        category,
    };

    products.push(newProduct);
    res.status(200).send({ error: null, data: newProduct });
});

// Actualizar un producto
router.put('/:id', validateUpdateProduct, validateProductExists, (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(product => product.id === id);

    const { title, description, code, price, stock, category } = req.body;

    //solo actualiza los campos que se han proporcionado
    if (req.body.hasOwnProperty('title')) {
        product.title = title;
    }
    if (req.body.hasOwnProperty('description')) {
        product.description = description;
    }
    if (req.body.hasOwnProperty('code')) {
        product.code = code;
    }
    if (req.body.hasOwnProperty('price')) {
        product.price = parseFloat(price);
    }
    if (req.body.hasOwnProperty('stock')) {
        product.stock = parseInt(stock);
    }
    if (req.body.hasOwnProperty('category')) {
        product.category = category;
    }

    res.status(200).send({ error: null, data: product });
});

// Eliminar un producto
router.delete('/:id', validateProductExists, (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(product => product.id === id);

    products.splice(index, 1);
    res.status(200).send({ error: null, data: products });
});

export default router;
