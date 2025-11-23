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

<<<<<<< HEAD:web-data-viz-main/src/routes/resultado.js
module.exports = router;
=======
module.exports = router;
>>>>>>> 180cee76a5af7f281aa7dc96bc5a712db213bb26:web-data-viz/src/routes/resultado.js
