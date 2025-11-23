var database = require("../database/config");

function buscarEstatisticasGerais(idUsuario) {
    console.log("Acessando o model para buscar estatísticas gerais do usuário:", idUsuario);
    var instrucaoSql = `
        SELECT 
            COALESCE(SUM(totalAcertos), 0) AS totalAcertos,
            COALESCE(SUM(totalErros), 0) AS totalErros
        FROM resultado
        WHERE fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarHistoricoPartidas(idUsuario) {
    console.log("Acessando o model para buscar histórico de partidas do usuário:", idUsuario);
    var instrucaoSql = `
        SELECT 
            r.totalAcertos, 
            DATE_FORMAT(p.dataFim, '%d/%m/%Y %H:%i') AS dataPartida
        FROM resultado r
        JOIN partida p ON r.fkPartida = p.idPartida
        WHERE r.fkUsuario = ${idUsuario}
        ORDER BY p.dataFim ASC;  -- Mudado para ASC para ordem cronológica
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function registrarPartida(idUsuario, totalAcertos, totalErros, pontos) {
    console.log("Acessando o model para registrar partida e resultado...");

    var instrucaoPartida = `
        INSERT INTO partida (dataFim) VALUES (NOW());
    `;

    return database.executar(instrucaoPartida).then(resultadoPartida => {
        const fkPartida = resultadoPartida.insertId;

        var instrucaoResultado = `
            INSERT INTO resultado (totalAcertos, pontos, totalErros, fkPartida, fkUsuario) 
            VALUES (${totalAcertos}, ${pontos}, ${totalErros}, ${fkPartida}, ${idUsuario});
        `;

        console.log("Executando a instrução SQL de Resultado: \n" + instrucaoResultado);
        return database.executar(instrucaoResultado);
    });
}

module.exports = {
    buscarEstatisticasGerais,
    buscarHistoricoPartidas,
    registrarPartida
<<<<<<< HEAD:web-data-viz-main/src/models/resultadoModel.js
};
=======
};
>>>>>>> 180cee76a5af7f281aa7dc96bc5a712db213bb26:web-data-viz/src/models/resultadoModel.js
