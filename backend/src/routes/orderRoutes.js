import { Router } from 'express';
import { createOrder, getTableOrders, closeTableAccount } from '../controllers/orderController,js';
import { checkAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(checkAuth);

router.post('/', createOrder);
router.get('/table/:tableId', getTableOrders);
router.post('/table/:tableId/close', closeTableAccount);

export default router;