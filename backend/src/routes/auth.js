// src/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Registrar un nuevo usuario
 * @access  Público
 */
router.post('/register', async (req, res) => {
  try {
    const { usuario, clave } = req.body;
    
    // Validar datos
    if (!usuario || !clave) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }
    
    // Verificar si el usuario ya existe
    const existingUser = await Usuario.findOne({ 
      where: { 
        [req.body.email ? 'email' : 'nombre']: req.body.email || usuario
      } 
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya existe'
      });
    }
    
    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(clave, salt);
    
    // Crear usuario en la base de datos
    const newUser = await Usuario.create({
      nombre: usuario,
      email: req.body.email || `${usuario}@example.com`, // Provisional si no se proporciona email
      password: hashedPassword,
      rol: 'usuario'
    });
    
    // Excluir la contraseña de la respuesta
    const userData = newUser.toJSON();
    delete userData.password;
    
    console.log(`✅ Usuario registrado: ${usuario}`.success);
    
    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: userData
    });
  } catch (error) {
    console.error('❌ Error al registrar usuario:'.failed, error);
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
    const { usuario, clave } = req.body;
    
    // Validar datos
    if (!usuario || !clave) {
      return res.status(400).json({
        success: false,
        message: 'Usuario y contraseña son obligatorios'
      });
    }
    
    // Verificar si el usuario existe (buscar por nombre o email)
    const user = await Usuario.findOne({ 
      where: { 
        [usuario.includes('@') ? 'email' : 'nombre']: usuario
      } 
    });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Credenciales inválidas'
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
        message: 'Credenciales inválidas'
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
      process.env.JWT_SECRET || 'tu_secreto_jwt',
      { expiresIn: process.env.JWT_EXPIRY || '1h' }
    );
    
    // Excluir la contraseña de la respuesta
    const userData = user.toJSON();
    delete userData.password;
    
    console.log(`✅ Usuario autenticado: ${usuario}`.success);
    
    res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      access_token,
      user: userData
    });
  } catch (error) {
    console.error('❌ Error al iniciar sesión:'.failed, error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor al iniciar sesión'
    });
  }
});

// Crear rutas correspondientes a las que el frontend está utilizando
router.post('/registro', (req, res) => {
  // Redirigir a la ruta register
  return router.handle(req, res, '/register');
});

router.post('/api/registro', (req, res) => {
  // Redirigir a la ruta register
  return router.handle(req, res, '/register');
});

router.post('/api/login', (req, res) => {
  // Redirigir a la ruta login
  return router.handle(req, res, '/login');
});

module.exports = router;