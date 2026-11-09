import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { validateBody } from '../middlewares/auth.validador.js';
import { registerSchema, loginSchema } from '../schema/auth.schema.js';

const router = Router();

//Rotas Publicas:
router.post('/register',validateBody(registerSchema), register);
router.post('/login',validateBody(loginSchema), login);

export default router;