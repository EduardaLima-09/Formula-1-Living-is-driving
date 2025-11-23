var express = require("express");
var router = express.Router();

var resultadoController = require("../controllers/resultadoController");

// CORRIGIDO: mudado de "/estatisticas" para "/estatisticas"
router.get("/estatisticas/:idUsuario", function (req, res) {
    resultadoController.buscarEstatisticas(req, res);
});

router.post("/registrar", function (req, res) {
    resultadoController.registrarResultado(req, res);
});

module.exports = router;
