const repository = require("../repositories/achadoperdido-repository");
const authService = require("../services/auth-service");

exports.post = async (req, res, next) => {
    try {
        let usuarioCadastro = await authService.userCurrent(authService.getToken(req));
        
        await repository.create({
            usuarioCadastro: usuarioCadastro,
            objeto: req.body.objeto,
            obs: req.body.obs
        });

        res.status(201).send({
            message: "Objeto cadastrado com sucesso!",
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

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: "Objeto foi alterado com sucesso!",
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição.",
        });
    }
};

exports.entregarObjeto = async (req, res, next) => {
    try {
        let dataRetirada = new Date();
        await repository.entregarObjeto(req.params.id, { usuarioRetirada: req.body.usuarioRetirada, dataRetirada: dataRetirada });
        res.status(200).send({
            message: "Objeto foi entregue com sucesso!",
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição.",
        });
    }
};