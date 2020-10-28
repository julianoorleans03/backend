const express = require("express");
const controller = require("../controllers/achadoperdido-controller");
const authService = require("../services/auth-service");

const router = express.Router();

router.post("/", authService.authorize, controller.post);
router.get("/", authService.authorize, controller.get);
router.put("/entregar/:id", authService.isAdmin, controller.entregarObjeto);
router.put("/:id", controller.put);

module.exports = router;
