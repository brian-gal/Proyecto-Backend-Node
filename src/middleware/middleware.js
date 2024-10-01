import { products, carts } from "../data/data.js";

// Middleware para validar la creación de un producto
export const validateProduct = (req, res, next) => {
    const { title, description, code, price, stock, category } = req.body;

    // Validar campos requeridos
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(404).send({ error: 'Faltan campos requeridos' });
    }

    // Verificar que price y stock sean números
    if (isNaN(price) || isNaN(stock)) {
        return res.status(404).send({ error: 'El precio y el stock deben ser números' });
    }

    next();
};

// Middleware para validar la actualización de un producto
export const validateUpdateProduct = (req, res, next) => {
    const { price, stock } = req.body;

    if (!Object.keys(req.body).length) {
        return res.status(404).send({ error: 'No se han proporcionado campos para actualizar' });
    }

    // Verificar que price y stock sean números si se proporcionan
    if (price !== undefined && isNaN(price)) {
        return res.status(404).send({ error: 'El precio debe ser un número' });
    }

    if (stock !== undefined && isNaN(stock)) {
        return res.status(404).send({ error: 'El stock debe ser un número' });
    }

    // Verificar si se intenta actualizar 'id'
    if (req.body.hasOwnProperty('status') || req.body.hasOwnProperty('id')) {
        return res.status(404).send({ error: 'No se puede actualizar el campo id' });
    }

    next();
};

// Middleware para verificar si el carrito existe
export const validateCart = (req, res, next) => {
    const id = parseInt(req.params.cid);
    const cart = carts.find(cart => cart.id === id);
    if (!cart) {
        return res.status(404).send({ error: 'Carrito no encontrado' });
    }
    next();
};

// Middleware para verificar si el producto existe
export const validateProductExists = (req, res, next) => {
    const id = parseInt(req.params.id);
    const product = products.find(product => product.id === id);
    if (!product) {
        return res.status(404).send({ error: 'Producto no encontrado' });
    }
    next();
};