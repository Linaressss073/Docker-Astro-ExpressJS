// middleware/auth.js
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

/**
 * Middleware para verificar el token JWT
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar
 */
const verifyToken = async (req, res, next) => {
  try {
    // Obtener el token del header
    const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');
    
    // Verificar si hay token
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Acceso denegado. No hay token proporcionado.' 
      });
    }
    
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_secreto_jwt');
    
    // Buscar al usuario en la base de datos
    const user = await Usuario.findByPk(decoded.id);
    
    // Verificar si el usuario existe y está activo
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Usuario no encontrado' 
      });
    }
    
    if (!user.activo) {
      return res.status(401).json({ 
        success: false,
        message: 'Usuario inactivo. Contacte al administrador.' 
      });
    }
    
    // Agregar el usuario al objeto de solicitud
    req.user = decoded;
    next();
  } catch (error) {
    console.error('❌ Error de autenticación:'.failed, error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expirado. Inicie sesión nuevamente.' 
      });
    }
    
    res.status(401).json({ 
      success: false,
      message: 'Token inválido' 
    });
  }
};

/**
 * Middleware para verificar si el usuario es admin
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar
 */
const isAdmin = (req, res, next) => {
  if (req.user && req.user.rol === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      success: false,
      message: 'Acceso denegado. Se requiere rol de administrador.' 
    });
  }
};

module.exports = { verifyToken, isAdmin };