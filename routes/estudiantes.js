const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/authMiddleware.js');
const estudianteController = require('../controllers/estudianteController');

// Rutas para el CRUD de estudiantes
router.get('/estudiantes', estudianteController.getEstudiantes);
router.post('/estudiantes', estudianteController.createEstudiante);
router.get('/estudiantes/:id', estudianteController.getEstudianteById);
// Agrega una nueva ruta para buscar por numeroId
router.get('/estudiantes/numeroid/:numeroId', estudianteController.getEstudianteByNumeroId);

router.put('/estudiantes/:id', estudianteController.updateEstudiante);

router.delete('/estudiantes/:id', estudianteController.deleteEstudiante);

router.post('/estudiantes/:numeroId/addCurso', estudianteController.addCursoToEstudiante);



module.exports = router;