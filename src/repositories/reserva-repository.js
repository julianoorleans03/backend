const mongoose = require("mongoose");

const Reserva = mongoose.model("Reserva");

exports.create = async (data) => {
  var reserva = new Reserva(data);
  await reserva.save();
};

exports.search = async () => {
  const res = await Reserva.find();
  return res;
};

exports.confirmarReserva = async (id, data) => {
  await Reserva.findByIdAndUpdate(id, {
    $set: {
      status: "confirmada"
    },
  });
};

exports.cancelarReserva = async (id, data) => {
  await Reserva.findByIdAndUpdate(id, {
    $set: {
      status: "cancelada"
    },
  });
};

exports.put = async (id, data) => {
  await Reserva.findByIdAndUpdate(id, {
    $set: {
      titulo: data
    },
  });
};