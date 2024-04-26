const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const config = require("./config/config");

// Crear la aplicación Express
const app = express();

// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Middleware para parsear JSON
app.use(express.json());

// Configuración de CORS para permitir solicitudes desde orígenes específicos
const corsOptions = {
  origin: ['http://localhost:5173', 'https://app.sabersalud.co'],
  optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11, varios SmartTVs) requieren esto
};

app.use(cors(corsOptions));

// Importar los routers
const estudiantesRouter = require('./routes/estudiantes');
const usuariosRouter = require("./routes/usuarios.js");

// Rutas de la aplicación
app.use('/api', estudiantesRouter);
app.use('/api/auth', usuariosRouter);

// Ruta para el home
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de estudiantes');
});

// Conexión a la base de datos
mongoose.connect(config.db.uri)
  .then(() => {
    console.log('Conexión a la base de datos establecida');
    // Iniciar el servidor solo después de conectar la base de datos
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor ejecutándose en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

  

 
