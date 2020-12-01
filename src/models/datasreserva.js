const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    datas: [{
        type: String,
        required: true,
    }],
    reserva: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reserva",
    },
});

module.exports = mongoose.model("Datasreserva", schema);