// routes/index.js
const express = require('express');
const authRoutes = require('./auth');
const protectedRoutes = require('./protected');

const router = express.Router();

/**
 * @route   GET /api/status
 * @desc    Verificar estado de la API
 * @access  Público
 */
router.get('/status', (req, res) => {
  res.json({ 
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date()
  });
});

// Montar las rutas de autenticación en /auth
router.use('/auth', authRoutes);

// Montar las rutas protegidas en /protected
router.use('/protected', protectedRoutes);

// Aquí puedes montar otras rutas
// router.use('/productos', productosRoutes);

module.exports = router;