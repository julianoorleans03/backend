const repository = require("../repositories/usuario-repository");
const md5 = require("md5");
const authService = require("../services/auth-service");

exports.post = async (req, res, next) => {
  try {
    await repository.create({
      nome: req.body.nome,
      email: req.body.email,
      senha: md5(req.body.senha + global.SALT_KEY),
      ativo: req.body.ativo,
      tipo: req.body.tipo,
    });

    let msg = "Usuário cadastrado com sucesso!"

    if (req.body.tipo == "user") {
      msg += " Solicite a liberação para o administrador do condomínio.";
    }

    res.status(201).send({
      message: msg,
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
    console.error(error);

    res.status(500).send({
      message: "Falha ao processar sua requisição.",
    });
  }
};

exports.getById = async (req, res, next) => {
  try {
    var data = await repository.searchById(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Falha ao processar sua requisição.",
    });
  }
};

exports.updateActive = async (req, res, next) => {
  try {
    await repository.updateActive(req.params.id, req.body.ativo);
    res.status(200).send({
      message: "Usuário foi ativado com sucesso!",
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Falha ao processar sua requisição.",
    });
  }
};

exports.put = async (req, res, next) => {
  try {

    req.body.senha = md5(req.body.senha + global.SALT_KEY);

    await repository.update(req.params.id, req.body);
    res.status(200).send({
      message: "Usuário foi alterado com sucesso!",
    });
  } catch (error) {
    res.status(500).send({
      message: "Falha ao processar sua requisição.",
    });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    let usuario = await repository.searchByEmail({
      email: req.body.email
    });

    if (!usuario && req.body.facebook) {
      await repository.create({
        nome: req.body.email,
        email: req.body.email,
        senha: md5(req.body.email + global.SALT_KEY),
        ativo: false,
        tipo: "user",
      });

      usuario = await repository.searchByEmail({
        email: req.body.email
      });
    }

    usuario = await repository.authenticate({
      email: req.body.facebook ? usuario.email: req.body.email,
      senha: req.body.facebook ?  usuario.senha : md5(req.body.senha + global.SALT_KEY),
    });

    if (!usuario) {
      res.status(401).send({
        message: "Usuário ou senha inválidos",
      });
      return;
    }

    if (!usuario.ativo) {
      res.status(401).send({
        message: "Usuário não confirmado pelo administrador.",
      });
      return;
    }

    const token = await authService.genereteToken({
      id: usuario._id,
      email: usuario.email,
      nome: usuario.nome,
      tipo: usuario.tipo
    });

    res.status(201).send({
      token: token,
      data: {
        email: usuario.email,
        nome: usuario.nome,
        id: usuario._id,
        tipo: usuario.tipo
      },
    });
  } catch (error) {    
    console.log(error);
    res.status(500).send({
      message: "Falha ao processar sua requisição.",
    });
  }
};