const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getFavoritos,
  crearFavorito,
  actualizarFavorito,
  eliminarFavorito,
  eliminarTodosLosFavoritos,
  actualizarTodosLosFavoritos,
} = require("../controllers/favorites");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

router.use(validarJWT);

// Obtener favoritos
router.get("/", getFavoritos);

// Crear un nuevo favorito
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
  crearFavorito
);

// Actualizar Favorito
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
  actualizarFavorito
);

// Actualizar  TODOS Favorito
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
  actualizarTodosLosFavoritos
);

//Borrar Favorito
router.delete("/:id", eliminarFavorito);

//Borrar TODOS Favorito
router.delete("/delete-all/:id", eliminarTodosLosFavoritos);

module.exports = router;
