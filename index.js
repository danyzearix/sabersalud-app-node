const express = require('express');
const mongoose = require("mongoose")
const config = require("./config/config")
const cors = require('cors');

const verificarToken = require('./middleware/authMiddleware');

// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

const app = express();
const cors = require('cors');

// Importamos los routers
const estudiantesRouter = require('./routes/estudiantes');
const usuariosRouter = require("./routes/usuarios.js")
// Middleware para parsear JSON
app.use(express.json());





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
  

  const port = process.env.PORT || 3000;
  console.log(`runing on port number ${port}`)
