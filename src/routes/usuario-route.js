const express = require("express");
const controller = require("../controllers/usuario-controller");
const authService = require("../services/auth-service");

const router = express.Router();

router.post("/", controller.post);
router.post("/autenticar", controller.authenticate);
router.get("/", authService.authorize, controller.get);
router.get("/:id", authService.authorize, controller.getById);
router.put("/ativar/:id", authService.isAdmin, controller.updateActive);
router.put("/:id", controller.put);

module.exports = router;
