import { Server } from 'socket.io';

const initSocket = (httpServer) => {

    const socketServer = new Server(httpServer);

    socketServer.on('connection', socket => {
        console.log(`Nuevo cliente conectado con id ${socket.id}`);
    });

}

export default initSocket;