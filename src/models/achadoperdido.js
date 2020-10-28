const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    usuarioCadastro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
        required: true,
    },
    objeto: { type: String, required: true },
    obs: { type: String, required: true },
    usuarioRetirada: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    },
    dataRetirada: {
        type: Date,
    },
});

module.exports = mongoose.model("AchadoPerdido", schema);