// reservasRouter.js
const express = require('express');
const router = express.Router();

const { Habitaciones, Reserva, Usuario } = require('../models');

// POST /api/habitaciones/:id/generarReserva
/**
 * @swagger
 * /api/habitaciones/{id}/generarReserva:
 *   post:
 *     summary: Generar una reserva para una habitación específica
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la habitación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuarioId
 *               - fechaEntrada
 *               - fechaSalida
 *               - cantidadPersonas
 *             properties:
 *               usuarioId:
 *                 type: integer
 *               fechaEntrada:
 *                 type: string
 *                 format: date
 *               fechaSalida:
 *                 type: string
 *                 format: date
 *               cantidadPersonas:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Reserva creada
 *       400:
 *         description: Fechas inválidas
 *       404:
 *         description: Habitación no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.post('/habitaciones/:id/generarReserva', async (req, res) => {
  const habitacionId = req.params.id;
  const { usuarioId, fechaEntrada, fechaSalida, cantidadPersonas } = req.body;

  try {
    // Validar que el usuario existe
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    // Validar que la habitación existe
    const habitacion = await Habitaciones.findByPk(habitacionId);
    if (!habitacion) {
      return res.status(404).json({ success: false, message: 'Habitación no encontrada' });
    }

    // Validar fechas
    const entrada = new Date(fechaEntrada);
    const salida = new Date(fechaSalida);
    const ahora = new Date();
    
    if (entrada < ahora) {
      return res.status(400).json({ success: false, message: 'La fecha de entrada no puede ser anterior a hoy' });
    }
    
    if (salida <= entrada) {
      return res.status(400).json({ success: false, message: 'La fecha de salida debe ser posterior a la fecha de entrada' });
    }

    // Calcular días y total
    const dias = Math.ceil((salida - entrada) / (1000 * 60 * 60 * 24));
    const precio = parseFloat(habitacion.precio);
    
    if (isNaN(precio)) {
      return res.status(500).json({ success: false, message: 'Precio de habitación no válido' });
    }

    const total = dias * precio;

    // Verificar disponibilidad (opcional: agregar esta validación)
    const reservasExistentes = await Reserva.findAll({
      where: {
        habitacionId,
        [require('sequelize').Op.or]: [
          {
            fechaEntrada: {
              [require('sequelize').Op.between]: [fechaEntrada, fechaSalida]
            }
          },
          {
            fechaSalida: {
              [require('sequelize').Op.between]: [fechaEntrada, fechaSalida]
            }
          },
          {
            [require('sequelize').Op.and]: [
              { fechaEntrada: { [require('sequelize').Op.lte]: fechaEntrada } },
              { fechaSalida: { [require('sequelize').Op.gte]: fechaSalida } }
            ]
          }
        ]
      }
    });

    if (reservasExistentes.length > 0) {
      return res.status(400).json({ success: false, message: 'La habitación no está disponible en las fechas seleccionadas' });
    }

    // Crear la reserva
    const reserva = await Reserva.create({
      usuarioId,
      habitacionId,
      fechaEntrada,
      fechaSalida,
      cantidadPersonas,
      total
    });

    return res.status(201).json({ 
      success: true, 
      message: 'Reserva creada exitosamente', 
      reserva: {
        id: reserva.id,
        usuarioId: reserva.usuarioId,
        habitacionId: reserva.habitacionId,
        fechaEntrada: reserva.fechaEntrada,
        fechaSalida: reserva.fechaSalida,
        cantidadPersonas: reserva.cantidadPersonas,
        total: reserva.total
      }
    });
  } catch (error) {
    console.error('Error al generar reserva:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message,
    });
  }
});

// GET /api/reservas/:reservaId - Obtener detalle de reserva por ID
/**
 * @swagger
 * /api/reservas/{reservaId}:
 *   get:
 *     summary: Obtener una reserva por su ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: reservaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Detalle de la reserva
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/reservas/:reservaId', async (req, res) => {
  try {
    const reserva = await Reserva.findByPk(req.params.reservaId, {
      include: [
        { model: Habitaciones, as: 'habitacion' },
        { model: Usuario, as: 'usuario' }
      ]
    });

    if (!reserva) {
      return res.status(404).json({ success: false, message: 'Reserva no encontrada' });
    }

    res.json({ success: true, reserva });
  } catch (error) {
    console.error('Error al obtener reserva:', error);
    res.status(500).json({ success: false, message: 'Error del servidor', error: error.message });
  }
});

// GET /api/booking/:habitacionId/reserva/:reservaId
/**
 * @swagger
 * /api/booking/{habitacionId}/reserva/{reservaId}:
 *   get:
 *     summary: Obtener reserva por habitación y reserva ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: habitacionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la habitación
 *       - in: path
 *         name: reservaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Detalle de la reserva
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/booking/:habitacionId/reserva/:reservaId', async (req, res) => {
  const { habitacionId, reservaId } = req.params;
  try {
    const reserva = await Reserva.findOne({
      where: { id: reservaId, habitacionId: habitacionId },
      include: [
        { model: Habitaciones, as: 'habitacion' },
        { model: Usuario, as: 'usuario' }
      ]
    });

    if (!reserva) {
      return res.status(404).json({ success: false, message: 'Reserva no encontrada para esa habitación.' });
    }

    res.json({ success: true, reserva });
  } catch (error) {
    console.error('Error al buscar reserva:', error);
    res.status(500).json({ success: false, message: 'Error del servidor.', error: error.message });
  }
});

module.exports = router;