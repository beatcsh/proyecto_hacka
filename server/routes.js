const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Crear la aplicación de Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Comprobar la conexión
mongoose.connection.on('error', (err) => {
  console.error('Error de conexión a MongoDB:', err);
});

mongoose.connection.once('open', () => {
  console.log('Conectado a MongoDB');
});

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('API de Zonas Peligrosas en funcionamiento');
});

// Definir un esquema y un modelo para las zonas peligrosas
const zoneSchema = new mongoose.Schema({
  dangerLevel: String,
  description: String,
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
});

const Zone = mongoose.model('Zone', zoneSchema);

// Ruta para obtener las zonas peligrosas
app.get('/zones', async (req, res) => {
  try {
    const zones = await Zone.find();
    res.json(zones);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Ruta para agregar zonas peligrosas
app.post('/add-zone', async (req, res) => {
  const newZone = new Zone({
    dangerLevel: req.body.dangerLevel,
    description: req.body.description,
    location: req.body.location,
    createdAt: new Date(), // Agregar fecha actual
  });

  try {
    await newZone.save();
    res.status(201).send('Zona peligrosa agregada');
  } catch (error) {
    res.status(400).send(error);
  }
});



// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
