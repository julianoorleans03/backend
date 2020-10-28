const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  nome: { type: String, required: true },
  detalhes: { type: String},
});

module.exports = mongoose.model("Salao", schema);