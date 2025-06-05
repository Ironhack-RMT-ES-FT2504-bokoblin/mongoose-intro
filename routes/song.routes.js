const express = require("express")
const router = express.Router()
// SIEMPRE DEBEMOS IMPORTAR Y CREAR EL ROUTER

// Rutas de canciones
const Song = require("../models/Song.model");

// Ruta para crear canciones
router.post("/", async (req, res, next) => {

  console.log(req.body)

  try {
    
    await Song.create({
      title: req.body.title,
      releaseDate: req.body.releaseDate,
      artist: req.body.artist,
      collaboratingArtists: req.body.collaboratingArtists
    })

    res.sendStatus(201)

  } catch (error) {
    next(error)
  }

})


// Ver detalles de una cancion
router.get("/:songId", async (req, res, next) => {
  console.log(req.params)

  try {

    const songDetails = await Song
    .findById( req.params.songId )
    .populate("artist", { name: 1, isTouring: 1, favOtherArtist: 1 })
    .populate("collaboratingArtists", { name: 1 })


    // ejemplo de populate anidado
    // .populate({
    //   path: "artist",
    //   populate: {
    //     path: "favOtherArtist", // propiedad anidada a popular
    //     model: "Artist", // modelo de colección vinculado a esta propiedad (la misma del esquema)
    //     select: { name: 1, awardsWon: 1 } // propiedades que queremos de vuelta.
    //   }
    // })
    
    console.log(songDetails.artist)
    // NO ES NECESARIO
    // const artistDetails = await Artist.findById( songDetails.artist )

    res.status(200).json(songDetails)

  } catch (error) {
    next(error)
  }
  
})

module.exports = router
// SIEMPRE DEBEMOS EXPORTAR EL ROUTER