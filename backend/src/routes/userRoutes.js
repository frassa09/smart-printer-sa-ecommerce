import { Router } from 'express';
import { listAllEmployees, activateEmployee, updateUserRole } from '../controllers/userController.js';
import { validateBody } from '../middlewares/auth.validador.js';
import { updateRoleSchema } from '../schema/user.schema.js';
import { checkAuth, checkRole } from '../middlewares/auth.middleware.js';

const router = Router();

// Todas as rotas deste arquivo exigem ADMIN
router.use(checkAuth, checkRole(["ADMIN"]));

router.get('/employees', listAllEmployees);
router.put('/:id/activate', activateEmployee);
router.patch('/:id/role', validateBody(updateRoleSchema), updateUserRole);

export default router;