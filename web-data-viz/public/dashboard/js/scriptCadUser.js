var botaoCadastrar;
var modalOverlay;
var botaoFecharModal;
var inputNome;
var inputEmail;
var inputNivel;
var inputSenha;
var botaoCadastrarModal;
var corpoTabela;
var tituloModal;
var linhaEmEdicao;          // Campo oculto que guarda o índice da linha     
       


function mostrarModal() {
    modalOverlay.style.display = 'block';
    inputNome.value = nomeUsuario ;
    inputEmail.value = emailUsuario;
    inputNivel.value = nivelUsuario;
    inputSenha.value = senhaUsuario;
    
    
    inputNome.focus();
   
    
}

function fecharModal() {
    modalOverlay.style.display = 'none';
}

// parâmetro do tipo objeto
function removerLinha(botaoExcluir) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        // Encontra o <tr> (linha) a partir do botão clicado:
        // 1º parentNode: sobe para o <td>
        // 2º parentNode: sobe para o <tr>
        var linha = botaoExcluir.parentNode.parentNode;
        linha.remove();
        alert('Usuário excluído');
    }
}


// parâmetro do tipo string
function salvarUsuario(nomeUsuario, emailUsuario, nivelUsuario, senhaUsuario) {
    if (nomeUsuario.trim() === '' ||
        emailUsuario.trim() === '' ||
        nivelUsuario.trim() === '' ||
        senhaUsuario.trim() === '') {
        alert('Por favor, insira os dados do usuário.');
        return;
    }

    var indiceLinha = linhaEmEdicao.value;

    if (indiceLinha !== '') {

        // pega todas as linhas do corpo da tabela
        var linhas = corpoTabela.getElementsByTagName('tr');

        var linhaASerEditada1 = linhas[indiceLinha - 1];
      

      
        var celulas = linhaASerEditada1.getElementsByTagName('td')
        celulas[1].innerHTML = nomeUsuario;
        celulas[2].innerHTML = emailUsuario;
       celulas[3].innerHTML = nivelUsuario;
       celulas[4].innerHTML = senhaUsuario;
         alert('Usuário editado com sucesso!');

    } else {
        var novoId = corpoTabela.getElementsByTagName('tr').length + 1; // adição no ID (como um AUTO_INCREMENT)
        var novaLinha = document.createElement('tr'); // adição de uma nova linha (tr)
        novaLinha.innerHTML = `
        <td>${novoId}</td>
        <td>${nomeUsuario}</td>
        <td>${emailUsuario}</td>
        <td>${nivelUsuario}</td>
        <td>${senhaUsuario}</td>
            <td>
                <button class="botaoAcao editarLinha" onclick="editarLinha(this)">
                    <span class="iconeAcao"><img class="iconesEditarExcluir" src="vetores/Group 48 (1).svg"></span>
                </button>
            </td>
        <td>
            <button class="botaoAcao botaoExcluir" onclick="removerLinha(this)">
                <span class="iconeAcao"><img class="iconesEditarExcluir" src="vetores/trash-2.svg"></span>
            </button>
        </td>
    `;

        corpoTabela.appendChild(novaLinha);
          alert('Usuário cadastrado com sucesso!');
    }
}



function inicializarEventos() {
    botaoCadastrar = document.getElementById('botaoCadastrar');
    modalOverlay = document.getElementById('modalOverlay');
    botaoFecharModal = document.getElementById('botaoFecharModal');
    inputNome = document.getElementById('Nome');
    inputEmail = document.getElementById('Email');
    inputNivel = document.getElementById('Nivel');
    inputSenha = document.getElementById('Senha');
    botaoCadastrarModal = document.getElementById('botaoCadastrarModal');
    // referência do corpo da tabela de forma simples:
    corpoTabela = document.getElementById('tabelaUsuarios').getElementsByTagName('tbody')[0];
    tituloModal = document.getElementById('tituloModal');
    linhaEmEdicao = document.getElementById('linhaEmEdicao');

    if (botaoCadastrar) {
        botaoCadastrar.onclick = function () {
            tituloModal.innerHTML = 'Cadastrar Usuario';
            botaoCadastrarModal.innerHTML = 'Cadastrar';
            linhaEmEdicao.value = '';
            mostrarModal();
        };
    }

    // E a chamada no botão do modal deve usar salvarIncubadora
    if (botaoCadastrarModal) {
        botaoCadastrarModal.onclick = function () {
            var nomeDigitado = inputNome.value;
            var emailDigitado = inputEmail.value;
            var nivelDigitado = inputNivel.value;
            var senhaDigitado = inputSenha.value;

            salvarUsuario(nomeDigitado, emailDigitado, nivelDigitado, senhaDigitado);
            fecharModal();
        };
    }

    if (botaoFecharModal) {
        botaoFecharModal.onclick = fecharModal;
    }

    if (botaoCadastrarModal) {
        botaoCadastrarModal.onclick = function () {
            let nomeDigitado = inputNome.value;
            let emailDigitado = inputEmail.value;
            let nivelDigitado = inputNivel.value;
            let senhaDigitado = inputSenha.value;

            salvarUsuario(nomeDigitado, emailDigitado, nivelDigitado, senhaDigitado);
            fecharModal();
        };
    }
}

function editarLinha(botao) {
    // Sobe: Botão -> TD -> TR.
    var linha = botao.parentNode.parentNode;

    // Encontra o valor da célula do nome (segunda célula, índice [1])
    var celulas = linha.getElementsByTagName('td');
    var nomeAtual = celulas[1].innerHTML;
    var emailAtual = celulas[2].innerHTML;
    var nivelAtual = celulas[3].innerHTML;
    var senhaAtual = celulas[4].innerHTML;

    // Guarda a POSIÇÃO (índice) da linha na tabela no campo oculto
    // 'rowIndex' é a propriedade que nos diz onde a linha está.
    linhaEmEdicao.value = linha.rowIndex;

    // Prepara o Modal para Edição
    tituloModal.innerHTML = 'Editar Usuário';
    botaoCadastrarModal.innerHTML = 'Salvar Edição';

    // Preenche o campo de texto do modal com o valor atual
    inputNome.value = nomeAtual;
    inputEmail.value = emailAtual;
    inputNivel.value = nivelAtual;
    inputSenha.value = senhaAtual;

    mostrarModal();
}

// Inicia o site após o carregamento
document.addEventListener('DOMContentLoaded', inicializarEventos);
