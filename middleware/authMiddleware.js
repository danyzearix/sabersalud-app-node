// authMiddleware.js

const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensaje: 'No se proporcionó un token' });
  }

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }
    req.usuarioId = decoded.id;
    next();
  });
};

module.exports = verificarToken;
