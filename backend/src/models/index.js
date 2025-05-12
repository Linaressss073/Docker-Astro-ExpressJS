// models/index.js
const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

// Definir el modelo Usuario
const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  rol: {
    type: DataTypes.ENUM('admin', 'usuario'),
    defaultValue: 'usuario'
  }
}, {
  timestamps: true,
  tableName: 'usuarios'
});

// Puedes definir otro modelo aquí
const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  tableName: 'productos'
});

// Definir relaciones entre modelos
Usuario.hasMany(Producto, { 
  foreignKey: 'usuarioId',
  as: 'productos'
});

Producto.belongsTo(Usuario, { 
  foreignKey: 'usuarioId',
  as: 'usuario'
});

// Función para sincronizar modelos con la base de datos
const syncModels = async () => {
  try {
    // alter: true aplicará los cambios a las tablas existentes sin borrar datos
    // force: true recrea las tablas (¡CUIDADO en producción!)
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados con la base de datos'.success);
  } catch (error) {
    console.error('❌ Error al sincronizar modelos:'.failed, error);
  }
};

// Exportar modelos y función de sincronización
module.exports = {
  Usuario,
  Producto,
  syncModels
};