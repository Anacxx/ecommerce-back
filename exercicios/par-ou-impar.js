const jogadorEscolha = process.argv[2];
const jogadorNumero = Number(process.argv[3]);

if (!jogadorEscolha || !jogadorNumero) {
    console.log('Você esqueceu de digitar, recomece!');
    process.exit(1);
} else if (!jogadorEscolha || !jogadorNumero) {
    console.log('Você esqueceu de digitar o número!');
    process.exit(1);
} else if (jogadorEscolha !== 'impar' && jogadorEscolha !== 'par') {
    console.log('Escolha inválida. Por favor, insira sua escolha corretamente (par ou impar) seguida de um número.');
    process.exit(1);
}

function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 6);
}

const pcEscolha = gerarNumeroAleatorio() % 2 === 0? 'par' : 'impar'
const pcNumero = gerarNumeroAleatorio()

const soma = pcNumero + jogadorNumero
if((soma % 2 === 0 && jogadorEscolha === 'par')|| (soma %2 !== 0 && jogadorEscolha === 'impar')){
    console.log(`Você escolheu ${jogadorEscolha} e o computador escolheu ${pcEscolha}. O resultado foi ${soma}. Você ganhou!`);
} else {
  console.log(`Você escolheu ${jogadorEscolha} e o computador escolheu ${pcEscolha}. O resultado foi ${soma}. Você perdeu!`);
}