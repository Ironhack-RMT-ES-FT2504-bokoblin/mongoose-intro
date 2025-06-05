try {
  process.loadEnvFile()
} catch (error) {
  console.warn("no se encontró variable .env, usando valores predeterminados")
}

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

const mongoose = require("mongoose")

const MONGO_URI = "mongodb://localhost:27017/artists-db"

mongoose.connect(MONGO_URI)
.then(() => {
  console.log("todo bien, conectados a la DB")
})
.catch((error) => {
  console.log(error)
})

// all middlewares & configurations here
app.use(logger("dev"));
app.use(express.static("public"));

// to allow CORS access from anywhere
app.use(cors({
  origin: '*'
}));

// below two configurations will help express routes at correctly receiving data. 
app.use(express.json()); // recognize an incoming Request Object as a JSON Object
app.use(express.urlencoded({ extended: false })); // recognize an incoming Request Object as a string or array


// all routes here...
app.get("/test/:recipeId/:comentarioId", (req, res, next) => {

  // como recibimos a la data que viene dentro del body?
  console.log( req.body )

  // como recibimos el id que hay en parametro dinamico?
  console.log( req.params )

  // como recibimos la query que hay en el URL?
  console.log( req.query )

  res.json({ message: "probando el servidor, todo bien!" })
})

// rutas de CRUD para artistas
const Artist = require("./models/Artist.model");

// Ruta para crear Artistas
app.post("/artist", (req, res) => {
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
    res.send("Artista creado correctamente")
  })
  .catch((error) => {
    console.log(error)
  })

  // como procesamos la respuesta de la BD Then/catch
  // que le decimos al cliente un res.send que diga, todo bien!

  

})

// Ruta para Buscar todos los artistas
app.get("/artist", async (req, res) => {

  try {
    const response = await Artist.find()
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

// Ruta para Buscar artistas que actualmente hacen gira y tienen más de 150 premios (página de inicio). Quieren solo las primeras 3 bandas, quieren solo los nombres y premios, y los quieren ordenado por cantidad de premios.
app.get("/artist/is-touring", async (req, res) => {
  try {
    const response = await Artist
    .find( {isTouring: true, awardsWon: { $gte: 150 } } )
    .select( { name: 1, awardsWon: 1 } )
    .sort( { awardsWon: 1 } )
    .limit(3)

    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

// Ruta para ver detalles de un documento (PENDIENTE)

// Ruta para borrar un solo documento
app.delete("/artist/:artistId", (req, res) => {

  Artist.findByIdAndDelete( req.params.artistId )
  .then(() => {
    res.send("todo ok, documento borrado")
  })
  .catch((error) => {
    console.log(error)
  })
})

// Ruta para editar todos los detalles un documento (PENDIENTE)

// Ruta para editar una sola propiedad de el documento
app.patch("/artist/:artistId/awards-won", async (req, res) => {

  console.log(req.params)
  console.log(req.body)

  try { 
    const responseFromDB = await Artist.findByIdAndUpdate( req.params.artistId, {
      awardsWon: req.body.awardsWon
    }, {new: true} )
    // si queremos forzar a mongo a que nos devuelva el documento DESPUES de la actualización. Agregamos argumento {new: true}
    res.json(responseFromDB)

  } catch (error) {
    console.log(error)
  }
})

// Rutas de canciones
const Song = require("./models/Song.model");

// Ruta para crear canciones
app.post("/song", async (req, res) => {

  console.log(req.body)

  try {
    
    await Song.create({
      title: req.body.title,
      releaseDate: req.body.releaseDate,
      artist: req.body.artist
    })

    res.send("cancion creada")

  } catch (error) {
    console.log(error)
  }

})


// Ver detalles de una cancion
app.get("/song/:songId", async (req, res) => {
  console.log(req.params)

  try {

    const songDetails = await Song
    .findById( req.params.songId )
    .populate("artist")
    
    console.log(songDetails.artist)
    // NO ES NECESARIO
    // const artistDetails = await Artist.findById( songDetails.artist )

    res.json(songDetails)

  } catch (error) {
    console.log(error)
  }
  
})

// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
