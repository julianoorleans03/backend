const repository = require("../repositories/reserva-repository");
const authService = require("../services/auth-service");

exports.post = async (req, res, next) => {
    try {
        let usuarioCadastro = await authService.userCurrent(authService.getToken(req));

        await repository.create({
            usuario: usuarioCadastro,
            salao: req.body.salao,
            dataInicio: req.body.dataInicio,
            dataFim: req.body.dataFim,
            titulo: req.body.titulo
        });

        res.status(201).send({
            message: "Reservado com sucesso! Aguarde a confirmação do Adminstrador.",
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

exports.confirmarReserva = async (req, res, next) => {
    try {
        await repository.confirmarReserva(req.params.id, req.body.status);
        res.status(200).send({
            message: "Reserva confirmada com sucesso!",
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição.",
        });
    }
};

exports.cancelarReserva = async (req, res, next) => {
    try {
        await repository.cancelarReserva(req.params.id, req.body.status);
        res.status(200).send({
            message: "Reserva cancelada com sucesso!",
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição.",
        });
    }
};


exports.put = async (req, res, next) => {
    try {
        await repository.put(req.params.id, req.body.titulo);
        res.status(200).send({
            message: "Reserva Alterada com sucesso!",
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição.",
        });
    }
};