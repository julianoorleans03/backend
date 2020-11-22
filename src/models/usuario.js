const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: { type: String, required: true },
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
    },
    senha: { type: String, required: true },
    ativo: { type: Boolean, required: true, default: false },
    tipo: { type: String, required: true, enum: ["user", "admin"], default: "user" },
    bloco: { type: String},
    numeroApartamento: { type: String},
});

module.exports = mongoose.model("Usuario", schema);