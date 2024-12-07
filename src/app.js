import express from 'express';
import session from "express-session";
import handlebars from 'express-handlebars';
import cookieParser from "cookie-parser";
import config from './config/config.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import userRouter from './routes/user.router.js';
import mongoose from 'mongoose';
import MongoStore from "connect-mongo";
import { errorHandler } from "./middlewares/errorHandler.js";
import passport from "passport";
import './auth/jwt.js';

const app = express();

const mongoStoreConfig = {
  store: MongoStore.create({
    mongoUrl: config.MONGODB_URL,
    crypto: {
      secret: config.SECRET_KEY,
    },
    ttl: 60,
  }),
  secret: "1234",
  cookie: { maxAge: 60000 },
  saveUninitialized: true,
  resave: true,
};

app.use(session(mongoStoreConfig));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

// Configuración Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

app.use(errorHandler);
//ruta de plantilla
app.use('/views', viewsRouter);

//rutas de api
app.use('/api/cart', cartsRouter)
app.use('/api/products', productsRouter)

//rutas de usuario
app.use("/api/user", userRouter);

//contenido estatico
app.use('/static', express.static(`${config.DIRNAME}/public`));

//corriendo el servidor
const httpServer = app.listen(config.PORT, async () => {
  await mongoose.connect(config.MONGODB_URL);
  console.log(`Servidor corriendo en el puerto ${config.PORT}`);
});