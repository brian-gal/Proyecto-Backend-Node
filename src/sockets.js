import { Server } from 'socket.io';
import { products } from './data/data.js';

const initSocket = (httpServer) => {
    const socketServer = new Server(httpServer);

    socketServer.on('connection', (socket) => {
        console.log(`Nuevo cliente conectado con id ${socket.id}`);

        socket.on('createProduct', (newProduct) => {

            const maxId = products.length > 0 ? Math.max(...products.map(element => +element.id)) : 0;
            const productToAdd = {
                id: maxId,
                ...newProduct,
            };

            socketServer.emit('productCreated', productToAdd);
        });

        socket.on('deleteProduct', (productId) => {
            socketServer.emit('productDeleted', productId);
        });
    });
}

export default initSocket;
