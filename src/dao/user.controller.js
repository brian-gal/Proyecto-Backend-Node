import userModel from './models/user.model.js';

class userController {
    constructor() { }

    // Obtener todos los usuarios
    get = async () => {
        try {
            return await userModel.find({}).select('_id first_name last_name email age password role').lean();
        }
        catch (err) {
            return err.message;
        }
    }

    getId = async (id) => {
        try {
            return await userModel.findById(id).lean();
        }
        catch (err) {
            return err.message;
        }
    }

    //crear un nuevo usuario
    add = async ({ first_name, last_name, email, age, password, role }) => {
        try {
            return await userModel.create({ first_name, last_name, email, age, password, role });
        }
        catch (err) {
            return err.message;
        }
    }

    //actualizar un usuario
    update = async (id, updateData) => {
        try {
            return await userModel.findOneAndUpdate({ _id: id }, updateData, { new: true });
        }
        catch (err) {
            return err.message;
        }
    }

    // eliminar un usuario
    delete = async (id) => {
        try {
            return await userModel.findOneAndDelete({ _id: id });
        }
        catch (err) {
            return err.message;
        }
    }

}

export default userController;
