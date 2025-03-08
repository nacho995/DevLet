const Review = require('../models/Review');

// @desc    Obtener todas las reseñas
// @route   GET /api/reviews
// @access  Public
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }); // Ordenar por fecha de creación (más recientes primero)
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor al obtener las reseñas'
    });
  }
};

// @desc    Crear una nueva reseña
// @route   POST /api/reviews
// @access  Public
const createReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    // Validación básica
    if (!name || !comment || !rating) {
      return res.status(400).json({
        success: false,
        error: 'Por favor proporciona nombre, calificación y comentario'
      });
    }

    // Crear la reseña
    const review = await Review.create({
      name,
      rating,
      comment
    });

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Error al crear reseña:', error);
    
    // Manejar errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: 'Error del servidor al crear la reseña'
    });
  }
};

// @desc    Obtener una reseña por ID
// @route   GET /api/reviews/:id
// @access  Public
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Reseña no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Error al obtener reseña por ID:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor al obtener la reseña'
    });
  }
};

// @desc    Actualizar una reseña
// @route   PUT /api/reviews/:id
// @access  Public (en un entorno real, esto debería ser protegido)
const updateReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    
    // Buscar la reseña y actualizarla
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { name, rating, comment },
      { new: true, runValidators: true } // Devolver el documento actualizado y ejecutar validadores
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Reseña no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Error al actualizar reseña:', error);
    
    // Manejar errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: 'Error del servidor al actualizar la reseña'
    });
  }
};

// @desc    Eliminar una reseña
// @route   DELETE /api/reviews/:id
// @access  Public (en un entorno real, esto debería ser protegido)
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Reseña no encontrada'
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error al eliminar reseña:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor al eliminar la reseña'
    });
  }
};

module.exports = {
  getReviews,
  createReview,
  getReviewById,
  updateReview,
  deleteReview
}; 