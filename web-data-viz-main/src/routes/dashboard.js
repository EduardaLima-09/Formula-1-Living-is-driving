var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/listarKpi/:idUusuario", function(req, res) {
    dashboardController.listarKpi(req, res)
});

router.get("/listarGrafico/:idUsuario", function(req, res) {
    dashboardController.listarGrafico(req, res)
});

module.exports = router;