const mongoose = require('mongoose');

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    // La URI de conexión se obtiene de las variables de entorno
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error al conectar a MongoDB: ${error.message}`);
    process.exit(1); // Salir con error
  }
};

module.exports = connectDB; 