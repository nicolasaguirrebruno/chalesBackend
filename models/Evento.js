const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
  id: {
    type: String,

    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  caracteristicas: {
    type: Array,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

module.exports = model("Evento", EventoSchema);
