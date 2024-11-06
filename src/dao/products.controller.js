import productsModel from './models/products.model.js';
import config from '../config/config.js';

class productsController {
    constructor() { }

    //buscar por id
    getID = async (id) => {
        try {
            return await productsModel.find({ _id: id }).lean();
        } catch (err) {
            return err.message;
        }
    }

    // Buscar todos los productos y aplicar filtros
    getPaginated = async ({ limit, page, order, category, stock }) => {
        try {
            const pageNum = parseInt(page) || 1;
            const limitNum = parseInt(limit) || config.ITEMS_PER_PAGE;
            const sortOption = order === 'asc' ? 1 : order === 'desc' ? -1 : null;

            // Filtro y opciones
            const filter = {};
            if (category) {
                filter.category = category;  
            }
            if (stock === 'true') {
                filter.stock = { $gt: 0 };  
            }

            const options = {
                limit: limitNum,
                page: pageNum,
                lean: true,
            };
            if (sortOption !== null) {
                options.sort = { price: sortOption };
            }

            // Ejecutar la consulta de paginación
            return await productsModel.paginate(filter, options);
        } catch (err) {
            return err.message;
        }
    };

    // Obtener categorías únicas
    getCategories = async () => {
        try {
            const products = await productsModel.find({}, 'category').lean();
            const categories = [...new Set(products.map(product => product.category))];
            return categories;
        } catch (err) {
            return err.message;
        }
    }


    // agregar un producto
    add = async ({ title, description, price, stock, category }) => {
        try {
            return await productsModel.create({ title, description, price, stock, category });
        } catch (err) {
            return err.message;
        }
    }

    //actualizar un producto
    update = async (id, updateData) => {
        try {
            return await productsModel.findOneAndUpdate({ _id: id }, updateData, { new: true });
        } catch (err) {
            return err.message;
        }
    }

    // eliminar un producto
    delete = async (id) => {
        try {
            return await productsModel.findOneAndDelete({ _id: id });
        } catch (err) {
            return err.message;
        }
    }

}


export default productsController;