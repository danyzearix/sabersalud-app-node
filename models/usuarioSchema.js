const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define el esquema del usuario
const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Middleware para hashear la contraseña antes de guardar el usuario
usuarioSchema.pre('save', async function(next) {
  try {
    // Solo hasheamos la contraseña si es nueva o ha sido modificada
    if (!this.isModified('password')) {
      return next();
    }

    // Genera un salt para hashear la contraseña
    const salt = await bcrypt.genSalt(10);

    // Hashea la contraseña con el salt
    this.password = await bcrypt.hash(this.password, salt);
    
    // Continúa con el guardado del usuario
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
usuarioSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    // Compara la contraseña ingresada con la almacenada en la base de datos
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Crea y exporta el modelo de usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
