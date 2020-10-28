const express = require("express");
const controller = require("../controllers/salao-controller");
const authService = require("../services/auth-service");

const router = express.Router();

router.post("/", authService.authorize, controller.post);
router.get("/", authService.authorize, controller.get);
router.put("/:id", authService.authorize, controller.put);

module.exports = router;
