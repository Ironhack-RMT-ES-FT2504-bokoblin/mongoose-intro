function handleErrors( app ) {

  app.use("*", (req, res) => {
    // gestor 404, Si la llamada del usuario no fue captada por ninguna ruta anterior, entonces entra aqui.
    res.status(404).json({ errorMessage: "No hay rutas que concuerden con el URL indicado" })
  })
  
  app.use((error, req, res, next) => {
    // gestor de errores 500. Creando una ruta a la que iran todos los catch de mis rutas.
    console.log(error)
    res.status(500).json({errorMessage: "Error de Servidor"})
  })

}

module.exports = handleErrors