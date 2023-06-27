const { response } = require("express");
const Producto = require("../models/Producto");

const getProductos = async (req, res = response) => {
  const productos = await Producto.find();

  res.json({
    ok: true,
    productos: productos,
  });
};

const crearProducto = async (req, res = response) => {
  const producto = new Producto(req.body);

  try {
    const productoGuardado = await producto.save();

    res.json({
      ok: true,
      producto: productoGuardado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarProducto = async (req, res = response) => {
  const productoId = req.params.id;

  try {
    const producto = await Producto.findById(productoId);

    if (!producto) {
      return res.status(404).json({
        ok: false,
        msg: "El producto no existe",
      });
    }

    const nuevoProducto = {
      ...req.body,
    };

    const productoActualizado = await Producto.findByIdAndUpdate(
      productoId,
      nuevoProducto,
      { new: true }
    );

    res.json({
      ok: true,
      producto: productoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarProducto = async (req, res = response) => {
  const productoId = req.params.id;

  try {
    const producto = await Producto.findById(productoId);

    if (!producto) {
      return res.status(404).json({
        ok: false,
        msg: "El producto no existe",
      });
    }

    await Producto.findByIdAndDelete(productoId);

    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
