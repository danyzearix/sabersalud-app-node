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
  edad: { type: Number, min: 18, max: 100, required: true },
  gradoEscolaridad: {
    type: String,
    required: true,
    enum: ['Ninguno', 'basica_primaria', 'bachiller', 'tecnico', 'tecnologo', 'profesional', 'especialista', 'maestria', 'doctorado']
  },
  profesion: { type: String },
  celular: { type: String }, // Asumiendo que el celular es una cadena para permitir prefijos.
  ciudadResidencia: { type: String, required: true },
  tipoIdentificacion: { 
    type: String, 
    required: true, 
    enum: ['T.I', 'C.C.', 'C.E.', 'P.A.']
  },
  numeroId: { 
    type: String, 
    required: true,
    min: 5 
  },
  cursos: [{
    nombreCurso: { type: String },
    vencimiento: { type: Date }, // Fecha de vencimiento individual por curso.
    fechaFactura: { type: Date }, // Fecha de la factura del curso.
    valor: { type: Number } // Valor del curso.
  }],
  fechaNacimiento: { type: Date, required: true }
});

const Estudiante = mongoose.model('Estudiante', estudianteSchema);


module.exports = Estudiante;

