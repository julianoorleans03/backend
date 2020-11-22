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
            senha: data.senha,
            numeroApartamento: data.numeroApartamento,
            bloco: data.bloco
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

exports.searchById = async (id) => {
    const res = await Usuario.findById(id);
    return res;
};

exports.authenticate = async (data) => {
    const res = await Usuario.findOne({
        email: data.email,
        senha: data.senha,
    });
    return res;
};

exports.searchByEmail = async (data) => {
    const res = await Usuario.findOne({
        email: data.email
    });
    return res;
};