function verificar() {
    var email = iptEmail.value;
    var validacao = "@";
    var senha = Number(iptSenha.value);

    if (email == "" || email.includes(validacao)) {
        console.log(`validação ok!`)
    } else {
        alert(`O E-mail necessita ter '@' ! `)
    }
}