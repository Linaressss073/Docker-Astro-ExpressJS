// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Crear instancia de Sequelize (con "e", no con "a") con parámetros desde variables de entorno
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false, // Cambia a true para ver las consultas SQL en consola
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Función para probar la conexión con la base de datos
const probarConexion = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente'.success);
    return true;
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:'.failed, error);
    return false;
  }
};

module.exports = {
  sequelize,
  probarConexion
};