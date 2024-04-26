
const Usuario = require('../models/usuarioSchema.js');
const jwt = require('jsonwebtoken');

// Función para registrar un nuevo usuario
const registro = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si el correo electrónico ya está registrado
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo electrónico ya está registrado' });
    }

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password
    });

    // Guardar el nuevo usuario en la base de datos
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Función para iniciar sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por su correo electrónico
    const usuario = await Usuario.findOne({ email });

    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const contraseñaValida = await usuario.comparePassword(password);
    if (!contraseñaValida) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Enviar el token como respuesta
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Función para cerrar sesión
const cerrarSesion = async (req, res) => {
  // En una aplicación de JWT, la sesión se maneja en el lado del cliente, por lo que no hay acción necesaria en el servidor para cerrar sesión.
  res.json({ mensaje: 'Sesión cerrada exitosamente' });
};

module.exports = {
  registro,
  login,
  cerrarSesion
};

