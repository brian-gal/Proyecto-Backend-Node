import mongoose from 'mongoose';
import config from '../../config/config.js';

mongoose.pluralize(null);

const collection = config.CART_COLLECTION;
const collectionProducts = config.PRODUCTS_COLLECTION;

// Generamos esquema, acá colocaremos la estructura de datos que nos interesa manejar
const schema = new mongoose.Schema({
    number: { type: Number, required: true },
    products: {
        type: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, ref: collectionProducts },
                quantity: Number
            }
        ], required: true
    },
});

// Generamos modelo
const model = mongoose.model(collection, schema);

export default model;