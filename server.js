try {
  process.loadEnvFile()
} catch (error) {
  console.warn("no se encontró variable .env, usando valores predeterminados")
}

const express = require("express");
const app = express();

require("./db")

const config = require("./config") // se importa la funcion que aplica las configuraciones al servidor
config( app ) // se ejecuta para aplicar las configuraciones al servidor


// all routes here...
const indexRouter = require("./routes/index.routes")
app.use("/api", indexRouter)

// Gestores de errores
const handleErrors = require("./errors")
handleErrors( app )

// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
