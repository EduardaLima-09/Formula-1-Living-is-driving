var database = require("../database/config");

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var confirmarSenha = req.body.confirmarSenhaServer;

    // VERIFICAÇÃO CASO TENHA ALGUM DADO NÃO PREENCHIDO
    if (!nome || !email || !senha || !confirmarSenha) {
        res.status(400).send("Preencha todos os campos!");
    } else {
        if (senha !== confirmarSenha) {
            res.status(400).send("As senhas não coicidem!")
        }
    }

    // OPA, AQUI INSERE NO MEU BANCO OS DADOS DO USUÁRIO QUANDO ELE SE CADASTRA :)
    var instruçãoSql = `
    INSERT INTO usuario (nome, email, senha, confirmarSenha)
    VALUES('${nome}', '${email}', '${senha}', '${confirmarSenha}');
    `;

    database.executar(instruçãoSql)
    .then(() => res.status(201).send("Usuário cadastrado com sucesso."))
    .catch((e) => res.status(500).json(e));
}

function login(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email || !senha) {
        res.status(400).send("Email ou senha vazios!");
    }

    var consulta = `
    SELECT idUsuario, nome FROM usuario
        WHERE email='${email}' AND senha='${senha}';
    `;

    database.executar(consulta)
    .then((resultado) => {
        if (resultado.length == 1) {
            res.json(resultado[0]);
        }else {
            res.status(403).send("Credenciais incorretas!");
        }
    })
    .catch((e) => res.status(500).json(e));
}

module.exports = {
    cadastrar,
    login
}



// POR VIA DAS DÚVIDAS VAI FICAR AQUI Ó :)
// var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel");

// function autenticar(req, res) {
//     var email = req.body.emailServer;
//     var senha = req.body.senhaServer;

//     if (email == undefined) {
//         res.status(400).send("Seu email está undefined!");
//     } else if (senha == undefined) {
//         res.status(400).send("Sua senha está indefinida!");
//     } else {

//         usuarioModel.autenticar(email, senha)
//             .then(
//                 function (resultadoAutenticar) {
//                     console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
//                     console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

//                     if (resultadoAutenticar.length == 1) {
//                         console.log(resultadoAutenticar);

//                         aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
//                             .then((resultadoAquarios) => {
//                                 if (resultadoAquarios.length > 0) {
//                                     res.json({
//                                         id: resultadoAutenticar[0].id,
//                                         email: resultadoAutenticar[0].email,
//                                         nome: resultadoAutenticar[0].nome,
//                                         senha: resultadoAutenticar[0].senha,
//                                         aquarios: resultadoAquarios
//                                     });
//                                 } else {
//                                     res.status(204).json({ aquarios: [] });
//                                 }
//                             })
//                     } else if (resultadoAutenticar.length == 0) {
//                         res.status(403).send("Email e/ou senha inválido(s)");
//                     } else {
//                         res.status(403).send("Mais de um usuário com o mesmo login e senha!");
//                     }
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }

// }

// function cadastrar(req, res) {
//     // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
//     var nome = req.body.nomeServer;
//     var email = req.body.emailServer;
//     var senha = req.body.senhaServer;
//     var fkEmpresa = req.body.idEmpresaVincularServer;

//     // Faça as validações dos valores
//     if (nome == undefined) {
//         res.status(400).send("Seu nome está undefined!");
//     } else if (email == undefined) {
//         res.status(400).send("Seu email está undefined!");
//     } else if (senha == undefined) {
//         res.status(400).send("Sua senha está undefined!");
//     } else if (fkEmpresa == undefined) {
//         res.status(400).send("Sua empresa a vincular está undefined!");
//     } else {

//         // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
//         usuarioModel.cadastrar(nome, email, senha, fkEmpresa)
//             .then(
//                 function (resultado) {
//                     res.json(resultado);
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log(
//                         "\nHouve um erro ao realizar o cadastro! Erro: ",
//                         erro.sqlMessage
//                     );
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }
// }

// module.exports = {
//     autenticar,
//     cadastrar
// }