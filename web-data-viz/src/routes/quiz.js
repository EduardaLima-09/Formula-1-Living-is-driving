var express = require("express");
var router = express.Router();
var quizController = require("../controllers/quizController");


// ROTA QUE TEM AS PERGUNTAS
router.get("/perguntas", function(req, res) {
    quizController.listarPerguntas(req, res);
});

// ESSA ROTA TEM AS RESPOSTAS
router.post("/responder", function(req, res){
    quizController.registrarResposta(req, res);
});

// ESSA ROTA TRAZ O HISTÓRICO
router.post("/historico", function(req, res){
    quizController.salvarHistorico(req, res);
});

module.exports = router;