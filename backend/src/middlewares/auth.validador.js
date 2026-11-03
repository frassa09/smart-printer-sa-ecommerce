import { formatError } from "zod";

export const validateBody = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if(!result.success) {
        //abaixo formatando para deixar para front, usando func ZOD apenas a mensagem de erro
        const formattedErrors = result.error.flatten().fieldErrors

        return res.status(400).json({
            error: 'Dados inválidos.',
            details: formattedErrors,
        });
    }
    //no ZOD sempre retorna sucesss tru com um campo DATA, e quando false(falha) devolve error
    req.body = result.data;
    next()
}