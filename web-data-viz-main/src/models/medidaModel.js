var database = require("../database/config");

function buscarEstatisticas(idUsuario, limite_linhas) {
    var instrucaoSql = `SELECT 
	totalAcertos,
    totalErros,
    CONCAT(ROUND((totalAcertos / 10) * 100, 2), '%') AS taxaAcerto
FROM resultado
WHERE fkUsuario = 3
    `;

    console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarEstatisticas
}