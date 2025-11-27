var express = require("express");
var router = express.Router();

var resultadoController = require("../controllers/resultadoController");

router.get("/estatisticas/:idUsuario", function (req, res) {
    resultadoController.buscarEstatisticas(req, res);
});

router.post("/registrar", function (req, res) {
    resultadoController.registrarResultado(req, res);
});

module.exports = router;