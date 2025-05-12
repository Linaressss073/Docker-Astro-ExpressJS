// src/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models'); // Asegúrate que la ruta a tus modelos es correcta
const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Registrar un nuevo usuario
 * @access  Público
 */
router.post('/register', async (req, res) => {
  try {
    const { usuario, email, clave } = req.body;

    // Validar datos
    if (!usuario || !email || !clave) {
      return res.status(400).json({
        success: false,
        message: 'Usuario, email y clave son obligatorios'
      });
    }

    // Validar formato de email (básico)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Por favor, introduce un email válido.'
        });
    }

    // Verificar si el email ya existe
    const existingUserByEmail = await Usuario.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    // Opcional: Verificar si el nombre de usuario ya existe (si también debe ser único)
    // const existingUserByNombre = await Usuario.findOne({ where: { nombre: usuario } });
    // if (existingUserByNombre) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'El nombre de usuario ya existe'
    //   });
    // }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(clave, salt);

    // Crear usuario en la base de datos
    const newUser = await Usuario.create({
      nombre: usuario,
      email: email,
      password: hashedPassword,
      rol: 'usuario' // O el rol por defecto que prefieras
    });

    // Excluir la contraseña de la respuesta
    const userData = newUser.toJSON();
    delete userData.password;

    // Puedes usar tu logger de colores si lo tienes configurado
    console.log(`✅ Usuario registrado: ${usuario} (${email})`);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: userData
    });
  } catch (error) {
    // Puedes usar tu logger de colores si lo tienes configurado
    console.error('❌ Error al registrar usuario:', error);
    // En caso de error de Sequelize por restricción única (aunque ya lo validamos antes)
    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
            success: false,
            message: 'El email o nombre de usuario ya existe.', // Mensaje genérico si no separamos la validación
        });
    }
    res.status(500).json({
      success: false,
      message: 'Error del servidor al registrar usuario'
    });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Iniciar sesión y obtener token
 * @access  Público
 */
router.post('/login', async (req, res) => {
  try {
    const { usuario, clave } = req.body; // 'usuario' puede ser nombre de usuario o email

    // Validar datos
    if (!usuario || !clave) {
      return res.status(400).json({
        success: false,
        message: 'Usuario/Email y contraseña son obligatorios'
      });
    }

    // Determinar si 'usuario' es un email o un nombre de usuario
    const isEmail = usuario.includes('@');
    const searchCriteria = isEmail ? { email: usuario } : { nombre: usuario };

    // Verificar si el usuario existe
    const user = await Usuario.findOne({ where: searchCriteria });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Credenciales inválidas' // Mensaje genérico para no revelar si el usuario o la contraseña es incorrecta
      });
    }

    // Verificar si el usuario está activo
    if (!user.activo) {
      return res.status(401).json({
        success: false,
        message: 'Usuario inactivo. Contacte al administrador.'
      });
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(clave, user.password);

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: 'Credenciales inválidas' // Mensaje genérico
      });
    }

    // Crear token JWT
    const access_token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        rol: user.rol
      },
      process.env.JWT_SECRET || 'tu_secreto_jwt_por_defecto_seguro', // Asegúrate de tener un JWT_SECRET en .env
      { expiresIn: process.env.JWT_EXPIRY || '1h' }
    );

    // Excluir la contraseña de la respuesta
    const userData = user.toJSON();
    delete userData.password;

    console.log(`✅ Usuario autenticado: ${user.nombre} (${user.email})`);

    res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      access_token,
      user: userData
    });
  } catch (error) {
    console.error('❌ Error al iniciar sesión:', error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor al iniciar sesión'
    });
  }
});

module.exports = router;

