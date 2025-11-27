var dashboardModel = require("../models/dashboardModel");

function listarKpi(req, res) {

    const limiteLinhas = 10;
    var idUsuario = req.params.idUsuario;

    console.log("foi?");

    dashboardModel.listarKpi(idUsuario, limiteLinhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            
        }
    })
}
