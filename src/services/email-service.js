var nodemailer = require("nodemailer");

var remetente = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
        user: "julianoorleans03@gmail.com",
        pass: "##123##321##"
    }
});

var emailASerEnviado = {
    from: "julianoorleans03@gmail.com",
    to: "julianoorleans03@gmail.com",
    subject: "Enviando Email com Node.js",
    text: "Estou te enviando este email com node.js",
};

enviarEmail = function (emailASerEnviado) {
    remetente.sendMail(emailASerEnviado, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email enviado com sucesso.");
        }
    });
}


exports.enviarEmailNovoUsuario = async function (usuario) {
    var emailASerEnviado = {
        from: "julianoorleans03@gmail.com",
        to: "julianoorleans03@gmail.com",
        subject: "Novo Usuario Cadastrado",
        text: "Novo usuário cadastro. Libere o acesso dele em 'Usuários Pendetes'. Usuário: " + usuario,
    };

    enviarEmail(emailASerEnviado);
}

exports.enviarEmailUsuarioLiberado = async function (usuario) {
    console.log(usuario.emailNotificacao);
    if (usuario.emailNotificacao) {
        var emailASerEnviado = {
            from: "julianoorleans03@gmail.com",
            to: usuario.emailNotificacao,
            subject: "Acesso Liberado",
            text: "Seu acesso foi liberado pelo adminstrador.",
        };

        enviarEmail(emailASerEnviado);
    }
}


exports.enviarEmail = async function (data) {
    var emailASerEnviado = {
        from: "julianoorleans03@gmail.com",
        to: data.emailNotificacao,
        subject: data.assunto,
        text: data.notificacao,
    };

    enviarEmail(emailASerEnviado);
}