const { Schema, model } = require("mongoose")

const songSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  releaseDate: Date,
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist"// ref viene de referencia y es la que apunta a la colección donde está ubicado este id
  } 
})

const Song = model("Song", songSchema)

module.exports = Song