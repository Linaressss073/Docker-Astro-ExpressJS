// routes/habitaciones.js
const express = require('express');
const router = express.Router();
const { Habitaciones } = require('../models/index');

// Obtener todas las habitaciones
router.get('/', async (req, res) => {
  try {
    const habitaciones = await Habitaciones.findAll();
    res.json(habitaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener habitaciones' });
  }
});

// Crear una nueva habitación
router.post('/', async (req, res) => {
  try {
    const nueva = await Habitaciones.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear habitación' });
  }
});

// Obtener una habitación por ID
router.get('/:id', async (req, res) => {
  try {
    const habitacion = await Habitaciones.findByPk(req.params.id);
    if (!habitacion) return res.status(404).json({ error: 'Habitación no encontrada' });
    res.json(habitacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la habitación' });
  }
});

// Actualizar habitación
router.put('/:id', async (req, res) => {
  try {
    const habitacion = await Habitaciones.findByPk(req.params.id);
    if (!habitacion) return res.status(404).json({ error: 'Habitación no encontrada' });

    await habitacion.update(req.body);
    res.json(habitacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la habitación' });
  }
});

// Eliminar habitación
router.delete('/:id', async (req, res) => {
  try {
    const habitacion = await Habitaciones.findByPk(req.params.id);
    if (!habitacion) return res.status(404).json({ error: 'Habitación no encontrada' });

    await habitacion.destroy();
    res.json({ mensaje: 'Habitación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la habitación' });
  }
});

module.exports = router;
