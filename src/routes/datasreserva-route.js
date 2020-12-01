const express = require("express");
const controller = require("../controllers/datasreserva-controller");
const authService = require("../services/auth-service");

const router = express.Router();

router.post("/", authService.authorize, controller.post);
router.get("/", authService.authorize, controller.get);
router.delete("/:idReserva", authService.authorize, controller.deletar);

module.exports = router;
