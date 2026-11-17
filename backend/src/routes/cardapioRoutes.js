import { Router } from 'express';
import { getCardapio, createCardapio, updateCardapio } from '../controllers/cardapioController.js'; 
import { checkAuth, checkRole } from '../middlewares/auth.middleware.js';

const router = Router();

// Rota pública para listar o cardápio
router.get('/', getCardapio);

//Rotas Protegidas ROLES
router.post('/admin', checkAuth, checkRole(['ADMIN', 'EMPLOYEE']), createCardapio);
router.put('/admin/:id', checkAuth, checkRole(['ADMIN', 'EMPLOYEE']), updateCardapio);

export default router;