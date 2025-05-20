// reservasRouter.js
const express = require('express');
const router = express.Router();

const { Habitaciones, Reserva, Usuario } = require('../models');

// POST /api/habitaciones/:id/generarReserva
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

router.get('/api/reservas/:reservaId', async (req, res) => {
  const { reservaId } = req.params;
  const reserva = await db.findReservaById(reservaId);
  
  if (!reserva) {
    return res.status(404).json({ message: 'Reserva no encontrada' });
  }

  res.json(reserva);
});


module.exports = router;
