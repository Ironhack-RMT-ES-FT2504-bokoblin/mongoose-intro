const mongoose = require("mongoose")

// creamos el Schema (la estructura de la data)
const artistSchema = new mongoose.Schema({
  name: {
    type: String, // validación type es OBLIGATORIA
    required: true, // significa que el valor de este campo es obligatorio
    unique: true // significa que el valor es unico y no se puede repetir dentro de la colección
  },
  awardsWon: {
    type: Number,
    required: true,
    min: 0 // significa que no acepta valores negativos
  },
  isTouring: Boolean,
  genre: {
    type: [String],
    enum: ["rock", "alternative", "punk", "grunge", "hip hop", "techno"] // esto indica los unicos posibles valores que puede tener esta propiedad
  },
})

// cremos el Model (la herramienta para acceder a la DB, esa colección)
const Artist = mongoose.model("Artist", artistSchema)
// 1. El nombre interno del modelo (IMPORTANTE para funcionamiento interno de mongo como relaciones) Se usa para definir el nombre de la colección (minuscula y plural)
// 2. El esquema

module.exports = Artist