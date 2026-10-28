// middlewares/auth.js
import jwt from 'jsonwebtoken';

// 1. Verifica se está logado
export const checkAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: 1, role: 'ADMIN' }
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};

// ROLES!!!
export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acesso negado: sem permissão.' });
    }
    next();
  };
};

// Exemplo de uso nas rotas futuras:
// app.post('/produtos', checkAuth, checkRole(['ADMIN', 'EMPLOYEE']), criarProduto);