const jwt = require("jsonwebtoken");

exports.genereteToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: "1d" });
};


exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
};

exports.userCurrent = async function (token) {
    let tokenDecodificado;

     await this.decodeToken(token).then((tokenDecoded) => {
        tokenDecodificado = tokenDecoded;
    });

    return tokenDecodificado.id;
}

exports.getToken = function (req) {
    var token = req.body.token || req.query.token || req.headers["x-access-token"];
    return token;
}

exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        res.status(401).json({
            message: "Acesso Restrito.",
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: "Token Inválido.",
                });
            } else {
                next();
            }
        });
    }
};

exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        res.status(401).json({
            message: "Token Inválido.",
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({ message: "Token Inválido." });
            } else {
                if (decoded.tipo == "admin") {
                    next();
                } else {
                    res.status(403).json({
                        message: "Esta funcionalidade é restrita para administradores.",
                    });
                }
            }
        });
    }
};