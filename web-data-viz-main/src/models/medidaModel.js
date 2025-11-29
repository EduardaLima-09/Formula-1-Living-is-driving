var database = require("../database/config");

function buscarEstatisticas(idUsuario, limite_linhas) {
    var instrucaoSql = `
        SELECT 
            r.totalAcertos,
            r.totalErros,
            ROUND((r.totalAcertos / 10) * 100, 2) AS taxaAcerto,
            p.dataFim
        FROM resultado r
            JOIN partida p 
                ON r.fkPartida = p.idPartida
                    WHERE r.fkUsuario = ${idUsuario}
                        ORDER BY p.dataFim DESC;
    `;

    console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}

// REGISTRAR RESULTADO
function registrarResultado(idUsuario, acertos, erros, pontos) {

    const sqlPartida = `
        INSERT INTO partida (dataFim) VALUES (NOW());
    `;

    console.log("Executando SQL (CRIAR PARTIDA): \n" + sqlPartida);

    return database.executar(sqlPartida).then((resultadoPartida) => {

        const idPartida = resultadoPartida.insertId;

        const sqlResultado = `
            INSERT INTO resultado (totalAcertos, totalErros, pontos, fkPartida, fkUsuario)
            VALUES (${acertos}, ${erros}, ${pontos}, ${idPartida}, ${idUsuario});
        `;

        console.log("Executando SQL (CRIAR RESULTADO): \n" + sqlResultado);
        return database.executar(sqlResultado);
    });
}

module.exports = {
    buscarEstatisticas,
    registrarResultado
};