import express from 'express';
import handlebars from 'express-handlebars';

import config from './config/config.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/cart.router.js';
import { Server } from 'socket.io';
import mongoose from 'mongoose';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

//rutas de api
app.use('/api/cart', cartsRouter)
app.use('/api/products', productsRouter)

//contenido estatico
app.use('/static', express.static(`${config.DIRNAME}/public`));

//corriendo el servidor
const httpServer = app.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGODB_URL);
    console.log(`Servidor corriendo en el puerto ${config.PORT}`);
});

const socketServer = new Server(httpServer);
app.set('socketServer', socketServer);

socketServer.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado con id ${socket.id}`);
});