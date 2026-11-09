import { z } from 'zod';

export const updateRoleSchema = z.object({
  role: z.enum(['CLIENT', 'EMPLOYEE', 'ADMIN'], {
    errorMap: () => ({ message: "O perfil deve ser 'CLIENT', 'EMPLOYEE' ou 'ADMIN'." }),
  }),
});