// Variáveis principais do jogo
let modo = '';
let pontuacao = 0;
let numero1;
let numero2;
let operacao;
let respostaCorreta;

// Função que inicia o jogo com o modo escolhido
function iniciarJogo(modoEscolhido) {
    modo = modoEscolhido;
    document.getElementById("area-jogo").style.display = "block";
    novaPergunta();
}

// Função que gera uma nova pergunta e mostra na tela
function novaPergunta() {
    const perguntaTexto = document.getElementById("pergunta");
    const respostaInput = document.getElementById("resposta");
    respostaInput.value = ""; // Limpa a resposta anterior
    document.getElementById("resultado").innerText = ""; // Limpa o resultado anterior
    document.getElementById("reiniciarJogo").style.display = "none"; // Esconde o botão de reiniciar

    if (modo === 'basico') {
        numero1 = Math.floor(Math.random() * 10); // Números de 0 a 9
        numero2 = Math.floor(Math.random() * 10);
        operacao = escolherOperacaoBasica();
    } else if (modo === 'desafio') {
        gerarNumerosDesafio();
        operacao = escolherOperacaoDesafio();
    }

    perguntaTexto.innerText = `${numero1} ${operacao} ${numero2} = ?`;

    // Foca no input para o usuário digitar a resposta
    respostaInput.focus();
}

// Gera números aleatórios, maiores no modo desafio
function gerarNumerosDesafio() {
    numero1 = Math.floor(Math.random() * 100); // Números de 0 a 99
    numero2 = Math.floor(Math.random() * 100);
    // Garante que o resultado da subtração não seja negativo
    if (numero1 < numero2 && operacao === '-') {
        [numero1, numero2] = [numero2, numero1];
    }
}

// Escolhe aleatoriamente uma operação básica: +, -
function escolherOperacaoBasica() {
    const operacoes = ['+', '-'];
    const indice = Math.floor(Math.random() * operacoes.length);
    return operacoes[indice];
}

// Escolhe aleatoriamente uma operação para o desafio: +, -, *
function escolherOperacaoDesafio() {
    const operacoes = ['+', '-', '*'];
    const indice = Math.floor(Math.random() * operacoes.length);
    return operacoes[indice];
}

// Calcula o resultado com base nos números e operação
function calcularResposta(n1, n2, op) {
    switch (op) {
        case '+': return n1 + n2;
        case '-': return n1 - n2;
        case '*': return n1 * n2;
    }
}

// Verifica se a resposta do usuário está correta
function verificarResposta() {
    const respostaUsuario = parseInt(document.getElementById("resposta").value);

    if (isNaN(respostaUsuario)) {
        document.getElementById("resultado").innerText = "Por favor, digite um número.";
        return;
    }

    respostaCorreta = calcularResposta(numero1, numero2, operacao);

    if (respostaUsuario === respostaCorreta) {
        document.getElementById("resultado").innerText = "Resposta Correta!";
        pontuacao++;
    } else {
        document.getElementById("resultado").innerText = `Resposta Incorreta. A resposta é ${respostaCorreta}.`;
    }

    document.getElementById("pontuacao").innerText = `Pontuação: ${pontuacao}`;
    document.getElementById("reiniciarJogo").style.display = "inline-block";
}

function reiniciarJogo() {
    pontuacao = 0;
    document.getElementById("pontuacao").innerText = `Pontuação: ${pontuacao}`;
    novaPergunta();
}