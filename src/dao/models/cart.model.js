import mongoose from 'mongoose';
import config from '../../config/config.js';

mongoose.pluralize(null);

const collection = config.CART_COLLECTION;
const collectionProducts = config.PRODUCTS_COLLECTION;

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

const model = mongoose.model(collection, schema);

export default model;