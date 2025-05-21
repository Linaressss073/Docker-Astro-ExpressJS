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
    const habitacion = await Habitaciones.findByPk(habitacionId);
    if (!habitacion) {
      return res.status(404).json({success:false, message: 'Habitación no encontrada' });
    }

    const dias = (new Date(fechaSalida) - new Date(fechaEntrada)) / (1000 * 60 * 60 * 24);
    if (dias <= 0) {
      return res.status(400).json({ message: 'Fechas inválidas' });
    }

    const total = dias * parseFloat(habitacion.precio);

    const reserva = await Reserva.create({
      usuarioId,
      habitacionId,
      fechaEntrada,
      fechaSalida,
      cantidadPersonas,
      total
    });

    return res.status(201).json({ message: 'Reserva creada', reserva });
  } catch (error) {
    console.error('Error al generar reserva:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener detalle de reserva por id (GET /api/reservas/:id)
/**
 * @swagger
 * /api/reservas/{id}:
 *   get:
 *     summary: Obtener detalle de una reserva por su ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
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
 *         description: Error interno del servidor
 */
router.get('/reservas/:id', async (req, res) => {
  try {
    const reserva = await Reserva.findByPk(req.params.id, {
        include: [
            { model: Habitaciones, as: 'habitacion' },
            { model: Usuario, as: 'usuario' }
        ]
    });
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json(reserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
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
      return res.status(404).json({ message: 'Reserva no encontrada para esa habitación.' });
    }

    res.json(reserva);
  } catch (error) {
    console.error('Error al buscar reserva:', error);
    res.status(500).json({ message: 'Error del servidor.' });
  }
});

// GET /reservas/:reservaId
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
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    res.json(reserva);
  } catch (error) {
    console.error('Error al obtener reserva:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
