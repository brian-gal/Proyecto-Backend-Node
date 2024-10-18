import fs from 'fs';

export class ProductManager {
    constructor(file) {
        this.file = file;
    }

    //verifica si el archivo existe y si no existe crea el archivo vacío
    async init() {
        try {
            await fs.promises.access(this.file);
        } catch (err) {
            console.log(`El archivo de ${this.file} No existe y fue creado`);
            await fs.promises.writeFile(this.file, JSON.stringify([]));
        }
    }

    //lee el archivo y lo convierte a un array de objetos
    async #readProductsFile() {
        const data = await fs.promises.readFile(this.file, 'utf-8');
        return JSON.parse(data);
    }

    //obtiene un parametro que hace referencia a el array global en cuestion de esta forma reutilizamos el mismo metodo para actualizar
    async editProduct(data) {
        await fs.promises.writeFile(this.file, JSON.stringify(data));
    }

    //obtiene los datos completos
    async getProducts() {
        return await this.#readProductsFile();
    }
}

// actualiza el array global de productos con los datos del json
const productManager = new ProductManager('./src/data/database/products.json');
await productManager.init();
export const products = await productManager.getProducts();

//actualiza el array global de carritos con los datos del json
const cartsManager = new ProductManager('./src/data/database/carts.json');
await cartsManager.init();
export const carts = await cartsManager.getProducts();