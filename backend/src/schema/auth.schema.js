import { z } from 'zod'

export const registerSchema =  z.object({
    name: z.string({ required_error: 'Nome é obrigatório.' }).min(3, 'O nome deve ter no minimo 3 caracteres'),
    email: z.string({ required_error: 'E-mail é obrigatório.' }).email('E-mail em formato inválido'),
    password: z.string({ required_error: 'Senha é obrigatória.' }).min(8, 'A senha deve ter no minimo 8 caracteres').regex(/[\W_]/, 'A senha deve conter pelo menos 1 caracter especial'),
})

export const loginSchema = z.object({
    email: z.string({required_error: 'E-mail é obrigatório.'}).email('Formato de e-mail inválido'),
    password: z.string({required_error: 'Senha é obrigatória.'}).min(8).regex(/[\W_]/, 'A senha deve conter pelo menos 1 caracter especial'),
})