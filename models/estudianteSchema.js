const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Correo electrónico no válido']
  },
  edad: { type: Number, min: 15, max: 100, required: true },
  gradoEscolaridad: {
    type: String,
    required: true,
    enum: ['Ninguno', 'basica_primaria', 'bachiller', 'tecnico', 'tecnologo', 'profesional', 'especialista', 'maestria', 'doctorado']
  },
  profesion: { type: String },
  celular: { type: String },
  celularAdicional: { type: String }, // Nuevo campo para número de contacto adicional
  comoTeGustariaQueTeLlamen: { type: String }, // Nuevo campo para cómo le gusta que le llamen
  ciudadResidencia: { type: String, required: true },
  direccion: { type: String, required: true },
  tipoIdentificacion: { 
    type: String, 
    required: true, 
    enum: ['T.I', 'C.C', 'C.E', 'P.A', 'P.P.T'] // Se ha añadido PPT como opción
  },
  numeroId: { 
    type: String, 
    required: true,
    min: 5,
    match: /^[^.,\s]*$/ // Expresión regular que excluye puntos, comas y espacios 
  },
  cursos: [{
    nombreCurso: { type: String },
    vencimiento: { type: Date }, // Fecha de vencimiento individual por curso.
    fechaFactura: { type: Date }, // Fecha de la factura del curso.
    valor: { type: Number } // Valor del curso.
  }]
});

const Estudiante = mongoose.model('Estudiante', estudianteSchema);

module.exports = Estudiante;

