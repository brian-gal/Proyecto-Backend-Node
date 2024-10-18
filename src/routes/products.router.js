import { Router } from 'express';
import { ProductManager, products } from "../data/data.js";
import { validateProduct, validateProductExists, validateUpdateProduct } from '../middleware/middleware.js';

const router = Router();
const productManager = new ProductManager('./src/data/products.json');

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
router.post('/', validateProduct, async (req, res) => {
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

    await productManager.editProduct(products);

    //emite a todos para crear el producto
    const socketServer = req.app.get('socketServer');
    socketServer.emit('createProduct', newProduct);

    res.status(200).send({ error: null, data: newProduct });
});

// Actualizar un producto
router.put('/:id', validateUpdateProduct, validateProductExists, async (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(product => product.id === id);

    const updates = req.body; // Obtén todos los datos de la solicitud

    // Itera sobre las propiedades del objeto updates
    for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
            // Actualiza directamente las propiedades del producto
            product[key] = updates[key];
        }
    }

    await productManager.editProduct(products);
    res.status(200).send({ error: null, data: product });
});

// Eliminar un producto
router.delete('/:id', validateProductExists, async (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(product => product.id === id);

    products.splice(index, 1);

    await productManager.editProduct(products);

    //emite a todos para borrar el producto
    const socketServer = req.app.get('socketServer');
    socketServer.emit('deleteProduct', id);
    
    res.status(200).send({ error: null, data: products });
});

export default router;
