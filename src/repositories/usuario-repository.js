const mongoose = require("mongoose");

const Usuario = mongoose.model("Usuario");

exports.create = async (data) => {
    var usuario = new Usuario(data);
    await usuario.save();
};

exports.update = async (id, data) => {
    await Usuario.findByIdAndUpdate(id, {
        $set: {
            nome: data.nome,
        },
    });
};

exports.updateActive = async (id, ativo) => {
    await Usuario.findByIdAndUpdate(id, {
        $set: {
            ativo: ativo,
        },
    });
};

exports.search = async () => {
    const res = await Usuario.find();
    return res;
};

exports.authenticate = async (data) => {
    const res = await Usuario.findOne({
        email: data.email,
        senha: data.senha,
    });
    return res;
};