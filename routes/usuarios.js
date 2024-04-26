const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/authMiddleware.js');

const usuarioController = require('../controllers/usuarioController.js');

// Rutas para la autenticación de usuarios
router.post('/registro', verificarToken, usuarioController.registro);
router.post('/login', usuarioController.login);
router.post('/cerrar-sesion', usuarioController.cerrarSesion);

module.exports = router;
