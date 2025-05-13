// routes/index.js
const express = require('express');
const authRoutes = require('./auth');
const protectedRoutes = require('./protected');
const orderRoutes = require('./orderRoutes'); // Importar las rutas de pedidos

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

// Montar las rutas de pedidos en /orders
router.use('/orders', orderRoutes);

module.exports = router;