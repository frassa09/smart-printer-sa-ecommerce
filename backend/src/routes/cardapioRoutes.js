import { Router } from 'express';
import { getCardapio } from '../controllers/cardapioController.js'; // Crie esse controller se ainda não tiver

const router = Router();

// Rota pública para listar o cardápio
router.get('/', getCardapio);

export default router;