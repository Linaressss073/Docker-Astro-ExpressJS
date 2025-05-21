const express = require('express');
const router = express.Router();
const { Habitaciones } = require('../models/index');

/**
 * @swagger
 * tags:
 *   name: Habitaciones
 *   description: Endpoints para gestión de habitaciones
 */

/**
 * @swagger
 * /api/habitaciones:
 *   get:
 *     summary: Obtener todas las habitaciones
 *     tags: [Habitaciones]
 *     responses:
 *       200:
 *         description: Lista de habitaciones
 */
router.get('/', async (req, res) => {
  try {
    const habitaciones = await Habitaciones.findAll();
    res.json(habitaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener habitaciones' });
  }
});

/**
 * @swagger
 * /api/habitaciones:
 *   post:
 *     summary: Crear una nueva habitación
 *     tags: [Habitaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               capacidad:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Habitación creada
 */
router.post('/', async (req, res) => {
  try {
    const nueva = await Habitaciones.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear habitación' });
  }
});

/**
 * @swagger
 * /api/habitaciones/{id}:
 *   get:
 *     summary: Obtener una habitación por ID
 *     tags: [Habitaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Habitación encontrada
 *       404:
 *         description: Habitación no encontrada
 */
router.get('/:id', async (req, res) => {
  try {
    const habitacion = await Habitaciones.findByPk(req.params.id);
    if (!habitacion) return res.status(404).json({ error: 'Habitación no encontrada' });
    res.json(habitacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la habitación' });
  }
});

/**
 * @swagger
 * /api/habitaciones/{id}:
 *   put:
 *     summary: Actualizar una habitación por ID
 *     tags: [Habitaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               capacidad:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Habitación actualizada
 *       404:
 *         description: Habitación no encontrada
 */
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

/**
 * @swagger
 * /api/habitaciones/{id}:
 *   delete:
 *     summary: Eliminar una habitación por ID
 *     tags: [Habitaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Habitación eliminada correctamente
 *       404:
 *         description: Habitación no encontrada
 */
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
