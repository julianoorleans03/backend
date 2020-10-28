
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");

const app = express();

mongoose.connect(config.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const Usuario = require("./models/usuario");
const Salao = require("./models/salao");
const AchadoPerdido = require("./models/achadoperdido");
const Reserva = require("./models/reserva");

const salaoRoute = require("./routes/salao-route");
const usuarioRoute = require("./routes/usuario-route");
const achadoPerdidoRoute = require("./routes/achadoperdido-route");
const reservaRoute = require("./routes/reserva-route");

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use("/salao", salaoRoute);
app.use("/usuario", usuarioRoute);
app.use("/achadoperdido", achadoPerdidoRoute);
app.use("/reserva", reservaRoute);

module.exports = app;