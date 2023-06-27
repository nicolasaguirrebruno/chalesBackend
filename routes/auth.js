const { Router } = require("express");

const router = Router();
const { validarCampos } = require("../middlewares/validar-campos");

const { check } = require("express-validator");

const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
  getUsuarios,
  eliminarUsuario,
} = require("../controllers/auth");

const { validarJWT } = require("../middlewares/validar-jwt");

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],

  crearUsuario
);

router.post(
  "/",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario
);

router.delete(
  "/delete/:email",
  [
    check("email", "El correo es obligatorio").isEmail(),

    validarCampos,
    validarJWT,
  ],
  eliminarUsuario
);

router.get("/renew", validarJWT, revalidarToken);

router.get("/users", validarJWT, getUsuarios);

module.exports = router;
