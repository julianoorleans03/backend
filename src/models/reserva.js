const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    salao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salao",
        required: true,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
    dataReserva: {
        type: Date,
        default: Date.now,
        required: true,
    },
    dataInicio: {
        type: String,
        required: true,
    },
    dataFim: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["pendente", "confirmada", "cancelada"],
        default: "pendente",
    },
    titulo: { type: String }
});

module.exports = mongoose.model("Reserva", schema);