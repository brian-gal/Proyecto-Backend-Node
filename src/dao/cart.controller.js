import cartModel from './models/cart.model.js'; // Asegúrate de tener la ruta correcta
import mongoose from 'mongoose';

class cartController {
    // Constructor
    constructor() { }

    // Obtener todos los carritos
    get = async () => {
        try {
            return await cartModel.find({}).select('_id number').lean();
        }
        catch (err) {
            return err.message;
        }
    }

    getId = async (id) => {
        try {
            return await cartModel.findById(id).populate('products._id').lean();
        }
        catch (err) {
            return err.message;
        }
    }

    //crear un nuevo carrito
    addCart = async () => {
        try {
            const Carts = await this.get();  // Obtener los carritos existentes
            const newNumber = Carts.length + 1;
            return await cartModel.create({ number: newNumber, products: [] });
        }
        catch (err) {
            return err.message;
        }
    };

    // Agregar un producto al carrito
    addProduct = async (cartId, productId, quantity) => {
        try {
            //actualiza la cantidad si ya existe el producto
            const updatedCart = await cartModel.findOneAndUpdate(
                { _id: cartId, 'products._id': productId },
                { $inc: { 'products.$.quantity': quantity } },
                { new: true }
            );

            if (updatedCart) {
                return updatedCart;
            }

            // Si el producto no existe, lo agrega al carrito
            return await cartModel.findOneAndUpdate(
                { _id: cartId },
                { $push: { products: { _id: productId, quantity: quantity } } },
                { new: true }
            );

        } catch (err) {
            return { error: err.message }; // Retorna un objeto de error
        }
    };

    // Eliminar un producto del carrito
    deleteProduct = async (cartId, productId) => {
        try {
            return await cartModel.findOneAndUpdate(
                { _id: cartId },
                { $pull: { products: { _id: productId } } },
                { new: true }
            );
        } catch (err) {
            return { error: err.message };
        }
    };

    // Eliminar todos los productos del carrito
    deleteAllProducts = async (cartId) => {
        try {
            return await cartModel.findByIdAndDelete(cartId);
        } catch (err) {
            return { error: err.message };
        }
    };



}

export default cartController;
