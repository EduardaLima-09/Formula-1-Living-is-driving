var resultadoModel = require("../models/resultadoModel");

function buscarEstatisticas(req, res) {
    const idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O id do usuário está indefinido!");
        return;
    }

    // Busca estatísticas gerais (total acertos e erros)
    resultadoModel.buscarEstatisticasGerais(idUsuario)
        .then(
            function (resultadoGeral) {
                // Busca histórico de partidas
                resultadoModel.buscarHistoricoPartidas(idUsuario)
                    .then(
                        function (resultadoHistorico) {
                            // Se não há dados, inicializar com zeros
                            const totalAcertos = resultadoGeral.length > 0 ? (resultadoGeral[0].totalAcertos || 0) : 0;
                            const totalErros = resultadoGeral.length > 0 ? (resultadoGeral[0].totalErros || 0) : 0;
                            const totalQuestoes = totalAcertos + totalErros;
                            const taxaAcerto = totalQuestoes > 0 ? (totalAcertos / totalQuestoes * 100).toFixed(2) : 0;
                            
                            // Envia todos os dados para o frontend
                            res.json({
                                estatisticasGerais: {
                                    totalAcertos: totalAcertos,
                                    totalErros: totalErros,
                                    taxaAcerto: parseFloat(taxaAcerto)
                                },
                                historico: resultadoHistorico || [] // Garantir que seja array
                            });
                        }
                    ).catch(
                        function (erro) {
                            console.log(erro);
                            // Em caso de erro, retornar dados zerados
                            res.json({
                                estatisticasGerais: {
                                    totalAcertos: 0,
                                    totalErros: 0,
                                    taxaAcerto: 0
                                },
                                historico: []
                            });
                        }
                    );
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar as estatísticas: ", erro.sqlMessage);
                // Em caso de erro, retornar dados zerados
                res.json({
                    estatisticasGerais: {
                        totalAcertos: 0,
                        totalErros: 0,
                        taxaAcerto: 0
                    },
                    historico: []
                });
            }
        );
}

function registrarResultado(req, res) {
    const idUsuario = req.body.idUsuarioServer;
    const totalAcertos = req.body.acertosServer;
    const totalErros = req.body.errosServer;
    const pontos = req.body.pontosServer;
    
    // Validação dos dados
    if (idUsuario == undefined || totalAcertos == undefined || totalErros == undefined || pontos == undefined) {
        res.status(400).send("Faltam dados para o registro do resultado!");
        return;
    }

    resultadoModel.registrarPartida(idUsuario, totalAcertos, totalErros, pontos)
        .then(
            function (resultado) {
                res.status(201).json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao registrar o resultado: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    buscarEstatisticas,
    registrarResultado
};
