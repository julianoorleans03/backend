const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    salao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salao",
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    },
    dataReserva: {
        type: Date,
        default: Date.now,
        required: true,
    },
    dataInicio: {
        type: Date,
        required: true,
    },
    dataFim: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["pendente", "confirmada", "cancelada"],
        default: "pendente",
    }
});

module.exports = mongoose.model("Reserva", schema);