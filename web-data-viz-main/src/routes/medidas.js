var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/kpis/:idUsuario", function (req, res) {
    medidaController.buscarEstatisticas(req, res);
});

router.post("/registrar", function (req, res) {
    medidaController.registrarResultado(req, res);
});

module.exports = router;