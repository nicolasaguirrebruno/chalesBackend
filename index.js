const express = require("express");
const dbConnection = require("./database/config");
const cors = require("cors");
require("dotenv").config();

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS

app.use(cors());

// Lectura y parseo del body

app.use(express.json());

// Rutas

// TODO: auth // crear, login, renew

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.use("/api/favorites", require("./routes/favorites"));
app.use("/api/products", require("./routes/products"));

// TODO: CRUD: Eventos

// Escuchar peticion
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
