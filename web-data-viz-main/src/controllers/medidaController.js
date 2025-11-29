var medidaModel = require("../models/medidaModel");

function buscarEstatisticas(req, res) {

    const limite_linhas = 10;

    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarEstatisticas(idUsuario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// REGISTRAR RESULTADO  
function registrarResultado(req, res) {

    var idUsuario = req.body.idUsuarioServer;
    var acertos = req.body.acertosServer;
    var erros = req.body.errosServer;
    var pontos = req.body.pontosServer;

    medidaModel.registrarResultado(idUsuario, acertos, erros, pontos)
        .then(function () {
            res.status(201).send("Resultado registrado com sucesso!");
        })
        .catch(function (erro) {
            console.log("Erro ao registrar resultado:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarEstatisticas,
    registrarResultado
};