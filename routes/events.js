const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
  actualizarTodosLosEventos,
  eliminarTodosLosEventos,
} = require("../controllers/events");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

router.use(validarJWT);
// Obtener eventos
router.get("/", getEventos);

// Crear un nuevo evento
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
  crearEvento
);

// Actualizar Evento
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
  actualizarEvento
);

// Actualizar todos los Evento
router.put(
  "/update-all/:id",
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
  actualizarTodosLosEventos
);

//Borrar Evento
router.delete("/:id", eliminarEvento);

//Borrar TODOS Evento
router.delete("/delete-all/:id", eliminarTodosLosEventos);

module.exports = router;
