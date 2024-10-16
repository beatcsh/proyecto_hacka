const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ['Point', 'Polygon'], // Permitir puntos y polígonos
      required: true,
    },
    coordinates: {
      type: mongoose.Schema.Types.Mixed, // Permitir diferentes estructuras para puntos y polígonos
      required: true,
    },
  },
  dangerLevel: {
    type: Number, // Considerar como un número si representa un nivel
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Habilitar la indexación geoespacial si es necesario
zoneSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Zone', zoneSchema);
