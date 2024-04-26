const express = require('express');
const mongoose = require("mongoose")
const config = require("./config/config")

const verificarToken = require('./middleware/authMiddleware');

// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

const app = express();

// Importamos los routers
const estudiantesRouter = require('./routes/estudiantes');
const usuariosRouter = require("./routes/usuarios.js")
// Middleware para parsear JSON
app.use(express.json());

const cors = require('cors');
// Middleware de CORS para permitir peticiones de cualquier origen
app.use(cors({
  origin: 'http://localhost:5173' // Solo permite solicitudes de este origen
}));


// Rutas protegidas
app.use('/api', estudiantesRouter);
app.use('/api/auth', usuariosRouter);

// Ruta para el home
app.get('/', (req, res) => {
  res.send('API de estudiantes');
});

// Conexión a la base de datos
mongoose.connect(config.db.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('open', () => {
    console.log('Conexión a la base de datos establecida');
  });
  
  mongoose.connection.on('error', (error) => {
    console.log('Error al conectar a la base de datos:', error);
  });
  

// Puerto de escucha
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
