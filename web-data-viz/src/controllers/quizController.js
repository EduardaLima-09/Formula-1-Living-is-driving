var database = require("../database/config");

// VAMOS LISTAR AS PERGUNTAS
function listarPerguntas(req, res) {

    // AQUI EU CONSULTO A TABELA DO MEU BANCO, SEM DAR A RESPOSTA CORRETA
    var sql = `
    SELECT idPergunta, pergunta, alternativaA, alternativaB, alternativaC, alternativaD,
        FROM pergunta;
    `;

    database.executar(sql)
        .then(r => res.json(r))
        .catch(e => res.status(500).json(e));
}

// GUARDAR A RESPOSTA
function registrarResposta(req, res) {
    var idUsuario = req.body.idUsuario;
    var idPergunta = req.body.idPergunta;
    var resposta = req.body.resposta;

    // TÔ TRAZENDO A RESPOSTA CORRETA, ATRAVÉS DESSE SELECT
    var sqlCorreta = `
        SELECT correta FROM pergunta 
            WHERE idPergunta = ${idPergunta};
    `;

    database.executar(sqlCorreta)
        .then(r => {
            var correta = r[0].correta;
            var acertou = (resposta === correta) ? 1 : 0;

            // DE NOVO CONSULTANDO SE ESTÁ CORRETA A RESPOSTA
            var sqlInsert = `
                INSERT INTO resposta (resposta, acertou, fkUsuario, fkPergunta)
                VALUES ('${resposta}', ${acertou}, ${idUsuario}, ${idPergunta});
            `;

            database.executar(sqlInsert)
                .then(() => res.json({ acertou }))
                .catch(e => res.status(500).json(e));
        })
        .catch(e => res.status(500).json(e));
}

// AGORA PARA GERAR KPIS
function salvarHistorico(req, res) {
    var idUsuario = req.body.idUsuario;
    var acertos = req.body.acertos;
    var erros = req.body.erros;
    var duracao = req.body.duracao;


    // TÔ PUXANDO DA TABELA QUIZ
    var sql = `
        INSERT INTO quizHistorico (acertos, erros, duracaoSegundos, fkUsuario)
        VALUES (${acertos}, ${erros}, ${duracao}, ${idUsuario});
    `;

    database.executar(sql)
        .then(() => res.status(201).send("Histórico salvo."))
        .catch(e => res.status(500).json(e));
}

module.exports = {
    listarPerguntas,
    registrarResposta,
    salvarHistorico
};