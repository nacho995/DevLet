const mongoose = require('mongoose');

// Esquema para las reseñas
const reviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor ingresa tu nombre']
  },
  rating: {
    type: Number,
    required: [true, 'Por favor selecciona una calificación'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: [true, 'Por favor ingresa un comentario']
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Añade createdAt y updatedAt
});

module.exports = mongoose.model('Review', reviewSchema); 