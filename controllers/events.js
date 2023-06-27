const { response } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");

  res.json({
    ok: true,
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);
  console.log(req.body);
  try {
    evento.user = req.uid;

    const eventoGuardado = await evento.save();

    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "El evento no existe",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de editar este evento",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarTodosLosEventos = async (req, res = response) => {
  const eventoId = req.params.id;

  try {
    const eventos = await Evento.find({ id: eventoId });

    if (eventos) {
      const promesas = eventos.map(async (evento) => {
        if (!evento) {
          return res.status(404).json({
            ok: false,
            msg: "El evento no existe",
          });
        }

        const nuevoEvento = {
          ...req.body,
          user: evento.user,
        };

        return Evento.findOneAndUpdate({ id: eventoId }, nuevoEvento, {
          new: true,
        });
      });

      const eventosActualizados = await Promise.all(promesas);

      res.json({
        ok: true,
        eventos: eventosActualizados,
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

const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findOne({ id: eventoId, user: uid });

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "El evento no existe",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio para eliminar este evento",
      });
    }
    await Evento.findOneAndDelete({ id: eventoId });

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

const eliminarTodosLosEventos = async (req, res = response) => {
  const eventoId = req.params.id;

  try {
    const eventos = await Evento.find({ id: eventoId });

    if (eventos) {
      if (eventos.length === 0) {
        return res.status(404).json({
          ok: false,
          msg: "No se encontraron eventos con ese ID",
        });
      }

      await Evento.deleteMany({ id: eventoId });

      return res.status(200).json({
        ok: true,
        msg: "Eventos eliminados exitosamente",
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
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
  eliminarTodosLosEventos,
  actualizarTodosLosEventos,
};
