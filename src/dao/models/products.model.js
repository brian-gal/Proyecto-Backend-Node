import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import config from '../../config/config.js';

mongoose.pluralize(null);

const collection = config.PRODUCTS_COLLECTION;

const schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true }, 
});

schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);

export default model;