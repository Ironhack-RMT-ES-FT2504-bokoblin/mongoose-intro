const express = require("express")
const router = express.Router()

router.get("/test/:recipeId/:comentarioId", (req, res, next) => {

  // como recibimos a la data que viene dentro del body?
  console.log( req.body )

  // como recibimos el id que hay en parametro dinamico?
  console.log( req.params )

  // como recibimos la query que hay en el URL?
  console.log( req.query )

  res.status(200).json({ message: "probando el servidor, todo bien!" })
})

const artistRouter = require("./artist.routes")
router.use("/artist", artistRouter)

const songRouter = require("./song.routes")
router.use("/song", songRouter)


module.exports = router