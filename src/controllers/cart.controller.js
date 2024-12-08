import cartModel from '../dao/models/cart.model.js';

class cartController {
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
            const newCart = await cartModel.create({ number: newNumber, products: [] });
            return newCart._id;
        } catch (err) {
            return err.message;
        }
    };


    // Agrega un producto al carrito
    add = async (cartId, productId, quantity) => {

        try {
            // Si el producto ya existe, actualizar la cantidad
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
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
        }
    }

    // Cambiar la cantidad de un producto en el carrito
    addUpdate = async (cartId, productId, quantity) => {
        try {
            return await cartModel.findOneAndUpdate(
                { _id: cartId, 'products._id': productId },
                { $inc: { 'products.$.quantity': quantity } },
                { new: true }
            );

        } catch (err) {
            return { error: err.message };
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
            return await cartModel.findByIdAndUpdate(
                cartId,
                { $set: { products: [] } },
                { new: true }
            );
        } catch (err) {
            return { error: err.message };
        }
    };


}

export default cartController;
