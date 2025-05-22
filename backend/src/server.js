// ============================
// Cargar dependencias
// ============================
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// ============================
// Configurar entorno y app
// ============================
dotenv.config();
const app = express();

// ============================
// Configurar CORS
// ============================
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4321',
  credentials: true
}));

// ============================
// Middleware
// ============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================
// Importar utilidades y rutas
// ============================
const colors = require('./colors/theme.js');
const { probarConexion } = require('./config/database.js');
const { syncModels, seedHabitaciones } = require('./models');

const rutasGenerales = require('./routes/index');
const authRoutes = require('./routes/auth.js');
const habitacionesRoutes = require('./routes/habitacionesRouter.js');
const reservasRoutes = require('./routes/reservasRouter.js');

// ============================
// Configurar Swagger
// ============================
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Hotel',
      version: '1.0.0',
      description: 'API para gestionar reservas y habitaciones',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./src/routes/**/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ============================
// Rutas básicas y salud
// ============================
app.get('/', (req, res) => {
  res.send('API Express funcionando');
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando correctamente' });
});

// ============================
// Montar rutas
// ============================

app.use('/api/auth', authRoutes);
app.use('/api/habitaciones', habitacionesRoutes);
app.use('/api', reservasRoutes);
app.use('/api', rutasGenerales);

// Rutas de compatibilidad con frontend
app.use('/api/registro', (req, res) => {
  req.url = '/';
  return authRoutes.handle(req, res);
});

app.use('/api/login', (req, res) => {
  req.url = '/';
  return authRoutes.handle(req, res);
});

// ============================
// Middleware de manejo de errores
// ============================
app.use((err, req, res, next) => {
  console.error('❌ Error del servidor:'.failed, err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

// ============================
// Iniciar servidor
// ============================
const PORT = process.env.PORT || 3001;

const iniciarServidor = async () => {
  try {
    const dbConectada = await probarConexion();
    if (dbConectada) {
      await syncModels();
      await seedHabitaciones();
      app.listen(PORT, () => {
        console.log(`✅ Servidor corriendo en el puerto ${PORT}`.success);
      });
    } else {
      console.log('No se pudo iniciar el servidor debido a la db'.failed);
    }
  } catch (error) {
    console.log('Error al iniciar el servidor: '.failed, error);
  }
};

iniciarServidor();
