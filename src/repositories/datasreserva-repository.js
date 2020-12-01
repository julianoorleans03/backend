const mongoose = require("mongoose");

const Datasreserva
  = mongoose.model("Datasreserva");

exports.create = async (data) => {
  var data = new Datasreserva(data);
  await data.save();
};

exports.search = async () => {
  const res = await Datasreserva.find();
  return res;
};

exports.delete = async (idReserva) => {
  await Datasreserva.deleteMany({ reserva: idReserva });
};