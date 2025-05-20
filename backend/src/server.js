// Constantes de dependencias
const express = require('express');
const dotenv = require('dotenv');
// Cargar variables de entorno lo antes posible
dotenv.config();

const cors = require('cors');
const app = express();


// Colors para estilizar
const colors = require('./colors/theme.js');
//Importando funciones
const { probarConexion } = require('./config/database.js');
const { syncModels, seedHabitaciones } = require('./models');
// Importar rutas
const rutas = require('./routes/index');

const reservasRoutes = require('./routes/reservasRouter.js')
const habitacionesRoutes = require('./routes/habitacionesRouter.js');
const router = require('./routes/reservasRouter.js');

// Configurar CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4321', // Puerto por defecto de Astro
  credentials: true
}));

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//rutas
app.get('/', (req,res) => {
    res.send('API Express funcionando')
});

// Configurar rutas
app.use('/api/auth', require('./routes/auth.js'));
// Añadir otras rutas según sea necesario

// Crear rutas de proxy para mantener compatibilidad con el frontend
app.use('/api/registro', (req, res) => {
  // Redirige a la ruta correcta en el backend
  req.url = '/';
  return require('./routes/auth.js').handle(req, res);
});

app.use('/api/login', (req, res) => {
  // Redirige a la ruta correcta en el backend
  req.url = '/';
  return require('./routes/auth.js').handle(req, res);
});

// Ruta de verificación de estado
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando correctamente' });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error('❌ Error del servidor:'.failed, err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});


// Montar las rutas
app.use('/api', rutas);

// Ruta base para habitaciones
app.use('/api/habitaciones', habitacionesRoutes );


app.use('/api', reservasRoutes);


const PORT = process.env.PORT || 3001;

//Iniciar servidor
const iniciarServidor = async () => {
    try {
        //Probar conexion
        const dbConectada = await probarConexion();
        if (dbConectada){
            await syncModels();
            await seedHabitaciones();
            app.listen(PORT , () =>{
                console.log(`✅ Servidor corriendo en el puerto ${PORT}`.success);

            });
        } else {
            console.log('No se pudo iniciar el servidor debido a la db'.failed)
        }
    } catch (error) {
        console.log('Error al iniciar el servidor: '.failed , error)
    }
};

iniciarServidor();