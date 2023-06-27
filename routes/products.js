const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/product");

// Obtener productos
router.get("/", getProductos);

router.use(validarJWT);

// Crear un nuevo producto
router.post(
  "/",
  [check("nombre", "El nombre es obligatorio").not().isEmpty(), validarCampos],
  [
    check("categoria", "La categoria es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  [
    check("caracteristicas", "Las caracteristicas no pueden estar vacias")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  [
    check("descripcion", "La descripcion no puede estar vacia").not().isEmpty(),
    validarCampos,
  ],
  [
    check("precio", "El precio no puede estar vacio").not().isEmpty(),
    validarCampos,
  ],
  [
    check("image", "Debe haber al menos una imagen").not().isEmpty(),
    validarCampos,
  ],
  crearProducto
);

// Actualizar producto
router.put(
  "/:id",
  [check("nombre", "El nombre es obligatorio").not().isEmpty(), validarCampos],
  [
    check("categoria", "La categoria es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  [
    check("caracteristicas", "Las caracteristicas no pueden estar vacias")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  [
    check("descripcion", "La descripcion no puede estar vacia").not().isEmpty(),
    validarCampos,
  ],
  [
    check("precio", "El precio no puede estar vacio").not().isEmpty(),
    validarCampos,
  ],
  [
    check("image", "Debe haber al menos una imagen").not().isEmpty(),
    validarCampos,
  ],
  actualizarProducto
);

//Borrar producto
router.delete("/:id", eliminarProducto);

module.exports = router;
