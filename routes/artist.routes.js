const express = require("express")
const router = express.Router()
// SIEMPRE DEBEMOS IMPORTAR Y CREAR EL ROUTER

// rutas de CRUD para artistas
const Artist = require("../models/Artist.model");

// POST "/api/artist" Ruta para crear Artistas
router.post("/", (req, res, next) => {
  // como probamos esta ruta 
  console.log("ruta bien todo ok")

  // como recibimos la data para crear el artista Body
  console.log(req.body)

  //! MALA practica simplemente pasar el objeto req.body al .create()
  //* podemos utilizar destructuración y reduccion de declaracion de objetos
  // como le pedimos a la DB que cree el artista: Modelo => Artist
  Artist.create({
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre
  })
  .then(() => {
    // si el código llega aqui, significa que el documento se creo correctamente.
    res.sendStatus(201)
  })
  .catch((error) => {
    next(error)
  })

  // como procesamos la respuesta de la BD Then/catch
  // que le decimos al cliente un res.send que diga, todo bien!

  

})

// Ruta para Buscar todos los artistas
router.get("/", async (req, res, next) => {

  try {
    const response = await Artist.find()
    res.status(200).json(response)
  } catch (error) {
    next(error) // envia al gestor de errores 500 y pasa el error
  }
})

// Ruta para Buscar artistas que actualmente hacen gira y tienen más de 150 premios (página de inicio). Quieren solo las primeras 3 bandas, quieren solo los nombres y premios, y los quieren ordenado por cantidad de premios.
router.get("/is-touring", async (req, res) => {
  try {
    const response = await Artist
    .find( {isTouring: true, awardsWon: { $gte: 150 } } )
    .select( { name: 1, awardsWon: 1 } )
    .sort( { awardsWon: 1 } )
    .limit(3)

    res.status(200).json(response)
  } catch (error) {
    console.log(error)
  }
})

// Ruta para ver detalles de un documento (PENDIENTE)

// Ruta para borrar un solo documento
router.delete("/:artistId", (req, res, next) => {

  Artist.findByIdAndDelete( req.params.artistId )
  .then(() => {
    res.sendStatus(202)
  })
  .catch((error) => {
    next(error)
  })
})

// Ruta para editar todos los detalles un documento (PENDIENTE)

// PATCH "/api/artist/:artistId/awards-won" Ruta para editar una sola propiedad de el documento
router.patch("/:artistId/awards-won", async (req, res, next) => {

  console.log(req.params)
  console.log(req.body)

  try { 
    const responseFromDB = await Artist.findByIdAndUpdate( req.params.artistId, {
      awardsWon: req.body.awardsWon
    }, {new: true} )
    // si queremos forzar a mongo a que nos devuelva el documento DESPUES de la actualización. Agregamos argumento {new: true}
    res.status(204).json(responseFromDB)

  } catch (error) {
    next(error)
  }
})



module.exports = router
// SIEMPRE DEBEMOS EXPORTAR EL ROUTER