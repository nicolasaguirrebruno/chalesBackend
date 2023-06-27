const { response } = require("express");
const Favorito = require("../models/Favoritos");
const Favoritos = require("../models/Favoritos");

const getFavoritos = async (req, res = response) => {
  const favoritos = await Favorito.find().populate("user", "name");

  res.json({
    ok: true,
    favoritos,
  });
};

const crearFavorito = async (req, res = response) => {
  const favorito = new Favorito(req.body);

  try {
    favorito.user = req.uid;

    const favoritoGuardado = await favorito.save();

    res.json({
      ok: true,
      favorito: favoritoGuardado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarFavorito = async (req, res = response) => {
  const favoritoId = req.params.id;
  const uid = req.uid;

  try {
    const favorito = await Favorito.findById(favoritoId);

    if (!favorito) {
      return res.status(404).json({
        ok: false,
        msg: "El favorito no existe",
      });
    }

    if (favorito.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de editar este favorito",
      });
    }

    const nuevoFavorito = {
      ...req.body,
      user: uid,
    };

    const favoritoActualizado = await Favorito.findByIdAndUpdate(
      favoritoId,
      nuevoFavorito,
      { new: true }
    );

    res.json({
      ok: true,
      favorito: favoritoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarTodosLosFavoritos = async (req, res = response) => {
  const favoritoId = req.params.id;

  try {
    const favoritos = await Favorito.find({ id: favoritoId });

    if (favoritos) {
      const promesas = favoritos.map(async (favorito) => {
        if (!favorito) {
          return res.status(404).json({
            ok: false,
            msg: "El favorito no existe",
          });
        }

        const nuevoFavorito = {
          ...req.body,
          user: favorito.user,
        };

        return Favoritos.findOneAndUpdate({ id: favoritoId }, nuevoFavorito, {
          new: true,
        });
      });

      const favoritosActualizados = await Promise.all(promesas);

      res.json({
        ok: true,
        favoritos: favoritosActualizados,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarFavorito = async (req, res = response) => {
  const favoritoId = req.params.id;
  const uid = req.uid;

  try {
    const favorito = await Favoritos.findOne({ id: favoritoId, user: uid });

    if (!favorito) {
      return res.status(404).json({
        ok: false,
        msg: "El favorito no existe",
      });
    }

    if (favorito.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio para eliminar este favorito",
      });
    }
    await Favoritos.findOneAndDelete({ id: favoritoId });

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

const eliminarTodosLosFavoritos = async (req, res = response) => {
  const favoritoId = req.params.id;

  try {
    const favoritos = await Favorito.find({ id: favoritoId });
    if (favoritos) {
      await Favorito.deleteMany({ id: favoritoId });

      return res.status(200).json({
        ok: true,
        msg: "Favoritos eliminados exitosamente",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getFavoritos,
  crearFavorito,
  actualizarFavorito,
  eliminarFavorito,
  eliminarTodosLosFavoritos,
  actualizarTodosLosFavoritos,
};
