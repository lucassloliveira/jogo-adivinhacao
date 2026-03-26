const mensagemEl = document.getElementById('mensagem');
const tentativasEl = document.getElementById('tentativas');
const palpiteEl = document.getElementById('palpite');
const reiniciarEl = document.getElementById('reiniciar');
const erroEl = document.getElementById('erro');
const btnChutar = document.querySelector('button');

let numero = Math.floor(Math.random() * 100) + 1;
const maxTentativas = 10;
let tentativasRestantes = maxTentativas;

function verificarChute(){
    const palpite = parseInt(palpiteEl.value);

    // Validação 
    if(isNaN(palpite) || palpite < 1 || palpite > 100){
        erroEl.classList.add('visible');
        return;
    }
    erroEl.classList.remove('visible');

    // Comparação do palpite
    if (palpite === numero) { 
        mensagemEl.textContent = 'Você acertou! 🎉';
        palpiteEl.disabled = true;
        btnChutar.disabled = true;
        reiniciarEl.classList.add('visible');
        return;
    }
    else if (palpite < numero) { mensagemEl.textContent = 'O número secreto é maior ⬆️'}
    else { mensagemEl.textContent = 'O número secreto é menor ⬇️'}
    palpiteEl.value = '';

    // Diminuir tentativas
    tentativasRestantes--;
    tentativasEl.textContent = `Tentativas restantes: ${tentativasRestantes}`;

    // Jogador não acertou 
    if (tentativasRestantes === 0 && palpite !== numero) {
        mensagemEl.textContent = `😢 Fim de jogo! O número secreto era ${numero}`
        palpiteEl.disabled = true;
        btnChutar.disabled = true;
        reiniciarEl.classList.add('visible');
    };
}

// Reiniciar o jogo
const reiniciarJogo = () => {
    numero = Math.floor(Math.random() * 100) + 1;
    tentativasRestantes = maxTentativas;

    tentativasEl.textContent = `Tentativas restantes: ${tentativasRestantes}`;
    mensagemEl.textContent = 'Faça seu primeiro chute!';
    palpiteEl.value = '';
    palpiteEl.disabled = false;
    btnChutar.disabled = false;
    reiniciarEl.classList.remove('visible');
}

// Habilita o Enter para fazer um palpite
palpiteEl.addEventListener('keydown', (evento)  => {
    if (evento.key === 'Enter') {
        verificarChute();
    }
});