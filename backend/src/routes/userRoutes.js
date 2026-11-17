import { Router } from 'express';
import { listAllEmployees, activateEmployee, updateUserRole, promoteByEmail } from '../controllers/userController.js';
import { validateBody } from '../middlewares/auth.validador.js';
import { updateRoleSchema } from '../schema/user.schema.js';
import { checkAuth, checkRole } from '../middlewares/auth.middleware.js';

const router = Router();

// Todas as rotas deste arquivo exigem ADMIN
router.use(checkAuth, checkRole(["ADMIN"]));

router.get('/employees', listAllEmployees);
router.put('/employees/:id/activate', activateEmployee);
router.patch('/employees/:id/role', validateBody(updateRoleSchema), updateUserRole);
router.patch('/employees/promote', promoteByEmail)

export default router;