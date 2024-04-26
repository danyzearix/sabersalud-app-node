const Estudiante = require('../models/estudianteSchema.js');

const getEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createEstudiante = async (req, res) => {
  try {
    const nuevoEstudiante = new Estudiante(req.body);
    await nuevoEstudiante.save();
    res.status(201).json({ mensaje: "Estudiante creado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getEstudianteById = async (req, res) => {
  try {
    const estudiante = await Estudiante.findById(req.params.id);
    if (!estudiante) {
      return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }
    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function getEstudianteByNumeroId(req, res) {
  try {
    const estudiante = await Estudiante.findOne({ numeroId: req.params.numeroId });
    if (!estudiante) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    res.json(estudiante);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar estudiante' });
  }
}

const updateEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!estudiante) {
      return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }
    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByIdAndRemove(req.params.id);
    if (!estudiante) {
      return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }
    res.json({ mensaje: "Estudiante eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Suponiendo que este controlador se agrega al archivo de controladores
const addCursoToEstudiante = async (req, res) => {
  const { numeroId } = req.params;
  const { nombreCurso, vencimiento, valor, fechaFactura } = req.body; // Añade valor y fechaFactura aquí

  try {
    // Encuentra al estudiante por su número de ID y añade el nuevo curso
    const estudiante = await Estudiante.findOneAndUpdate(
      { numeroId },
      { $push: { cursos: { nombreCurso, vencimiento, valor, fechaFactura } } }, // Incluye valor y fechaFactura en el $push
      { new: true } // Devuelve el documento actualizado
    );

    // Verifica si el estudiante fue encontrado y actualizado
    if (!estudiante) {
      return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }

    // Si el estudiante es encontrado y el curso es añadido correctamente, devuelve el estudiante actualizado
    res.json({ mensaje: "Curso añadido correctamente", estudiante });
  } catch (error) {
    // Maneja errores generales
    res.status(500).json({ error: error.message });
  }
};




module.exports = {
  getEstudiantes,
  createEstudiante,
  getEstudianteById,
  getEstudianteByNumeroId,
  updateEstudiante,
  deleteEstudiante,
  addCursoToEstudiante,
};
