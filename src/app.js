import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/cart.router.js';
import config from './config/config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/cart', cartsRouter)
app.use('/api/products', productsRouter)

// Maneja rutas no encontradas
app.use((req, res, next) => {
    res.status(404).send({ error: 'Ruta no encontrada' });
});

//usamos la variable global de config
app.listen(config.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${config.PORT}`);
});
