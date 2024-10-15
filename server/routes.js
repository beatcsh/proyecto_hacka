const express = require('express');
const router = express.Router();
const Zone = require('./models');

// Obtener todas las zonas peligrosas
router.get('/', async (req, res) => {
  try {
    const zones = await Zone.find();
    res.json(zones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear una nueva zona peligrosa
router.post('/', async (req, res) => {
  const zone = new Zone({
    location: req.body.location,
    dangerLevel: req.body.dangerLevel,
    description: req.body.description,
  });

  try {
    const newZone = await zone.save();
    res.status(201).json(newZone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
