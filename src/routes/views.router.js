import { Router } from 'express';
import { products } from '../data/data.js';

const router = Router();

// Renderizar la vista de la página de inicio con los productos
router.get('/home', (req, res) => {
    res.status(200).render('home', { products }); // 'home' es el nombre de tu plantilla
});

export default router;