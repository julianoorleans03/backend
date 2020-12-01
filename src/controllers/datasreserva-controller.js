const repository = require("../repositories/datasreserva-repository");
const authService = require("../services/auth-service");

exports.post = async (req, res, next) => {
    try {
        await repository.create(req.body);
        res.status(201).send({
            message: "Datas da reserva cadastrado com sucesso! Aguarde a confirmação do Adminstrador.",
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição.",
        });
    }
};

exports.get = async (req, res, next) => {
    try {
        var data = await repository.search();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição.",
        });
    }
};

exports.deletar = async (req, res, next) => {
    try {
        await repository.delete(req.params.idReserva);

        res.status(200).send({
            message: "Objeto foi deletado com sucesso!",
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição.",
        });
    }
};