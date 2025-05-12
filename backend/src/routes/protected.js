// routes/protected.js
const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   GET /api/protected/perfil
 * @desc    Obtener perfil del usuario autenticado
 * @access  Privado
 */
router.get('/perfil', verifyToken, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Perfil obtenido correctamente',
      data: {
        id: req.user.id,
        nombre: req.user.nombre,
        email: req.user.email,
        rol: req.user.rol
      }
    });
  } catch (error) {
    console.error('❌ Error al obtener perfil:'.failed, error);
    res.status(500).json({ 
      success: false,
      message: 'Error al obtener perfil de usuario' 
    });
  }
});

/**
 * @route   GET /api/protected/admin
 * @desc    Ruta solo para administradores
 * @access  Privado (Solo Admin)
 */
router.get('/admin', verifyToken, isAdmin, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Acceso correcto al panel de administración',
      data: {
        admin: req.user.nombre,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('❌ Error en panel de administración:'.failed, error);
    res.status(500).json({ 
      success: false,
      message: 'Error del servidor' 
    });
  }
});

module.exports = router;