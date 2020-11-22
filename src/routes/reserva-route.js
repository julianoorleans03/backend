const express = require("express");
const controller = require("../controllers/reserva-controller");
const authService = require("../services/auth-service");

const router = express.Router();

router.post("/", authService.authorize, controller.post);
router.get("/", authService.authorize, controller.get);
router.put("/confirmar/:id", authService.isAdmin, controller.confirmarReserva);
router.put("/cancelar/:id", authService.authorize, controller.cancelarReserva);
router.put("/editar/:id", authService.authorize, controller.put);


module.exports = router;
