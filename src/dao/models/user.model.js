import mongoose from 'mongoose';
import config from '../../config/config.js';

mongoose.pluralize(null);

const collection = config.USERS_COLLECTION;

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
});

const User = mongoose.model(collection, userSchema);

export default User;
