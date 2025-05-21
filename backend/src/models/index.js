// models/index.js
const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

// Modelo Usuario
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
    validate: { isEmail: true }
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

// Modelo Producto
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

// Relaciones Usuario <-> Producto
Usuario.hasMany(Producto, { 
  foreignKey: 'usuarioId',
  as: 'productos'
});
Producto.belongsTo(Usuario, { 
  foreignKey: 'usuarioId',
  as: 'usuario'
});

// Modelo Habitaciones (plural)
const Habitaciones = sequelize.define('Habitaciones', {
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
  precio_anterior: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  cama: {
    type: DataTypes.STRING,
    allowNull: true
  },
  servicios: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('servicios');
      return rawValue ? JSON.parse(rawValue) : null;
    },
    set(value) {
      this.setDataValue('servicios', JSON.stringify(value));
    }
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estrellas: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'habitaciones'
});

// Modelo Reserva (singular)
const Reserva = sequelize.define('Reserva', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fechaEntrada: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  fechaSalida: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  cantidadPersonas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'confirmada', 'cancelada', 'finalizada'),
    defaultValue: 'pendiente'
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'reservas'
});

// Relaciones Usuario <-> Reserva
Usuario.hasMany(Reserva, { foreignKey: 'usuarioId', as: 'reservas' });
Reserva.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

// Relaciones Habitaciones <-> Reserva
Habitaciones.hasMany(Reserva, { foreignKey: 'habitacionId', as: 'reservas' });
Reserva.belongsTo(Habitaciones, { foreignKey: 'habitacionId', as: 'habitacion' });

// Sincronización de modelos con la base de datos
const syncModels = async () => {
  try {
    await sequelize.sync();
    console.log('✅ Modelos sincronizados con la base de datos');
  } catch (error) {
    console.error('❌ Error al sincronizar modelos:', error);
  }
};

const initialRooms = [
  {
    nombre: "Suite Presidencial",
    descripcion: "La cúspide del lujo. Amplia suite con vistas panorámicas, cama King extragrande, sala de estar independiente, comedor, cocina equipada y baño de mármol con jacuzzi.",
    precio: 350,
    precio_anterior: 450,
    capacidad: 4,
    cama: "King XL Bed",
    servicios: [
      "Desayuno Gourmet",
      "Baño Privado con Jacuzzi",
      "WiFi de Alta Velocidad",
      "TV de Pantalla Plana 65\"",
      "Minibar Premium",
      "Servicio de Mayordomo"
    ],
    imagen: "suite_presidencial.jpg",
    estrellas: 5,
    tipo: "Luxury Suite"
  },
  {
    nombre: "Habitación Doble Superior",
    descripcion: "Confort y estilo para tu estancia. Dos camas Queen, balcón privado con vistas a la ciudad, baño moderno y todas las comodidades esenciales.",
    precio: 110,
    precio_anterior: 130,
    capacidad: 2,
    cama: "Queen Beds",
    servicios: [
      "Desayuno",
      "Baño Privado",
      "WiFi Gratuito",
      "TV de Pantalla Plana",
      "Balcón"
    ],
    imagen: "doble_superior.jpg",
    estrellas: 4,
    tipo: "Superior"
  },
  {
    nombre: "Estudio con Cocina",
    descripcion: "Ideal para estancias prolongadas. Funcional estudio con cama King, área de trabajo, cocina americana totalmente equipada y baño completo.",
    precio: 100,
    precio_anterior: null,
    capacidad: 2,
    cama: "King Bed",
    servicios: [
      "Baño Privado",
      "WiFi",
      "TV",
      "Cocina Equipada",
      "Lavandería"
    ],
    imagen: "estudio_cocina.jpg",
    estrellas: 3,
    tipo: "Apartment"
  },
  {
    nombre: "Habitación Familiar Conectada",
    descripcion: "Perfecta para familias. Dos habitaciones conectadas, una con cama King y otra con dos camas individuales, dos baños y espacio para todos.",
    precio: 180,
    precio_anterior: 220,
    capacidad: 4,
    cama: "King Bed & Twin Beds",
    servicios: [
      "Desayuno",
      "Dos Baños",
      "WiFi",
      "TV en cada habitación",
      "Aire Acondicionado"
    ],
    imagen: "familiar_conectada.jpg",
    estrellas: 4,
    tipo: "Family"
  },
  {
    nombre: "Suite Junior con Terraza",
    descripcion: "Disfruta del aire fresco en nuestra Junior Suite. Cama King, sala de estar pequeña y una amplia terraza privada con mobiliario exterior.",
    precio: 160,
    precio_anterior: 190,
    capacidad: 2,
    cama: "King Bed",
    servicios: [
      "Desayuno",
      "Baño Privado",
      "WiFi",
      "Smart TV",
      "Terraza Privada"
    ],
    imagen: "suite_junior.jpg",
    estrellas: 4,
    tipo: "Suite"
  },
  {
    nombre: "Habitación Individual Económica",
    descripcion: "Una opción práctica y cómoda para viajeros solitarios. Cama individual, baño privado y servicios básicos incluidos.",
    precio: 70,
    precio_anterior: 85,
    capacidad: 1,
    cama: "Single Bed",
    servicios: [
      "Baño Privado",
      "WiFi",
      "TV"
    ],
    imagen: "individual_economica.jpg",
    estrellas: 3,
    tipo: "Economy"
  },
  {
    nombre: "Doble con Vistas al Mar",
    descripcion: "Despiértate con el sonido de las olas. Habitación doble con cama Queen y espectaculares vistas panorámicas al océano.",
    precio: 140,
    precio_anterior: 170,
    capacidad: 2,
    cama: "Queen Bed",
    servicios: [
      "Desayuno",
      "Baño Privado",
      "WiFi",
      "TV",
      "Vistas al Mar"
    ],
    imagen: "doble_mar.jpg",
    estrellas: 5,
    tipo: "Premium"
  },
  {
    nombre: "Suite Ático",
    descripcion: "Exclusiva suite en el último piso. Cama King, sala de estar de doble altura, balcón envolvente con vistas de 360 grados y detalles de diseño únicos.",
    precio: 280,
    precio_anterior: 330,
    capacidad: 2,
    cama: "King Bed",
    servicios: [
      "Desayuno Exclusivo",
      "Baño de Lujo",
      "WiFi de Alta Velocidad",
      "Smart TV 70\"",
      "Minibar",
      "Balcón Panorámico"
    ],
    imagen: "suite_atico.jpg",
    estrellas: 5,
    tipo: "Penthouse"
  }
];

const seedHabitaciones = async () => {
  try {
    const count = await Habitaciones.count();
    if (count === 0) {
      // Mapeamos initialRooms para adaptarlo al modelo
      const habitacionesToInsert = initialRooms.map(room => ({
        nombre: room.nombre,
        descripcion: room.descripcion,
        precio: room.precio,
        precio_anterior: room.precio_anterior,
        capacidad: room.capacidad,
        cama: room.cama,
        servicios: room.servicios,
        imagen: room.imagen,
        estrellas: room.estrellas,
        tipo: room.tipo
      }));
      
      await Habitaciones.bulkCreate(habitacionesToInsert);
      console.log('✅ Habitaciones iniciales insertadas');
    } else {
      console.log('⚠️ Habitaciones ya existen, no se insertaron');
    }
  } catch (error) {
    console.error('❌ Error insertando habitaciones:', error);
  }
};

// Exportación de modelos y función sync
module.exports = {
  syncModels,
  seedHabitaciones,
  Usuario,
  Producto,
  Habitaciones,
  Reserva
};
