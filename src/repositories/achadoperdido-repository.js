const mongoose = require("mongoose");

const AchadoPerdido = mongoose.model("AchadoPerdido");

exports.create = async (data) => {
    var achadoPerdido = new AchadoPerdido(data);
    await achadoPerdido.save();
};

exports.search = async () => {
    const res = await AchadoPerdido.find();
    return res;
};

exports.update = async (id, data) => {
    await AchadoPerdido.findByIdAndUpdate(id, {
        $set: {
            objeto: data.objeto,
            obs: data.obs
        },
    });
};

exports.entregarObjeto = async (id, data) => {
    await AchadoPerdido.findByIdAndUpdate(id, {
        $set: {
            usuarioRetirada: data.usuarioRetirada,
            dataRetirada: data.dataRetirada
        },
    });
};