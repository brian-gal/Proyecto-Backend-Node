import express from 'express';
import { login, register, privateData } from '../controllers/user.controller.js';
import { checkAuthCookies } from '../middlewares/checkAuthCookies.js';  // Importar el middleware

const router = express.Router();

// Ruta de registro de usuario
router.post('/register', register);

// Ruta de login de usuario
router.post('/login', login);

// Ruta de datos privados que requiere autenticación
router.get('/current', checkAuthCookies('current'), privateData);

export default router;
