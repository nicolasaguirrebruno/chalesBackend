const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  // id: {
  //   type: String,
  //   unique: true,
  //   required: true,
  // },
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
});

ProductoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;
  return object;
});

module.exports = model("Producto", ProductoSchema);
