import { Router } from 'express';
import { register, login, listAllEmployees } from '../controllers/authController.js';
import { validateBody } from '../middlewares/auth.validador.js';
import { registerSchema, loginSchema } from '../schema/auth.shema.js';
import { checkRole } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register',validateBody(registerSchema), register);
router.post('/login',validateBody(loginSchema), login);
router.put('/register/:id', validateBody(registerSchema), checkRole(["ADMIN"]));
router.get('/employees', checkRole(["ADMIN"]), listAllEmployees);

export default router;