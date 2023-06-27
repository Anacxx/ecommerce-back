
const jogadorEscolha = process.argv[2];

if (!jogadorEscolha || !['pedra', 'papel', 'tesoura'].includes(jogadorEscolha)) {
  console.log('Escolha inválida. Por favor, insira sua escolha corretamente (pedra, papel ou tesoura).');
  process.exit(1);
}

function gerarEscolhaAleatoria() {
  const opcoes = ['pedra', 'papel', 'tesoura'];
  const indiceAleatorio = Math.floor(Math.random() * opcoes.length);
  return opcoes[indiceAleatorio];
}

const computadorEscolha = gerarEscolhaAleatoria();

function determinarResultado(jogador, computador) {
  if (jogador === computador) {
    return 'Empate!';
  } else if (
    (jogador === 'pedra' && computador === 'tesoura') ||
    (jogador === 'papel' && computador === 'pedra') ||
    (jogador === 'tesoura' && computador === 'papel')
  ) {
    return 'Você ganhou!';
  } else {
    return 'Você perdeu!';
  }
}

const resultado = determinarResultado(jogadorEscolha, computadorEscolha);

console.log(`Você escolheu ${jogadorEscolha} e o computador escolheu ${computadorEscolha}. ${resultado}`);