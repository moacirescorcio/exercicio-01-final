"use strict";
//15) Crie exceções relacionadas a valores obtidos da entrada de dados que não sejam aceitáveis, como valores vazios, números inválidos etc. Na aplicação, trate todas as entradas de dados para que, caso o usuário infrinja regras de preenchimento, o sistema lance e trate as exceções e informe que a entrada foi inválida. Nota: nenhuma das exceções lançadas por você ou pela aplicação deve “abortar” o programa. Elas devem ser obrigatoriamente tratadas.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//resolução mais abaixo
const prompt_sync_1 = __importDefault(require("prompt-sync"));
class Conta {
    constructor(numero, saldoInicial) {
        this.numero = numero;
        this.saldo = saldoInicial;
    }
    sacar(valor) {
        if (this.saldo >= valor) {
            this.saldo = this.saldo - valor;
        }
    }
    depositar(valor) {
        this.saldo = this.saldo + valor;
    }
    transferir(contaDestino, valor) {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }
    obterSaldo() {
        return this.saldo;
    }
}
class Banco {
    constructor() {
        this.contas = [];
    }
    inserir(conta) {
        let contaConsultada = this.consultar(conta.numero);
        if (contaConsultada == null) {
            this.contas.push(conta);
        }
    }
    consultar(numero) {
        let contaConsultada;
        for (let conta of this.contas) {
            if (conta.numero == numero) {
                contaConsultada = conta;
                break;
            }
        }
        return contaConsultada;
    }
    consultarPorIndice(numero) {
        let indice = -1;
        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                indice = i;
                break;
            }
        }
        return indice;
    }
    alterar(conta) {
        let indice = this.consultarPorIndice(conta.numero);
        if (indice != -1) {
            this.contas[indice] = conta;
        }
    }
    excluir(numero) {
        let indice = this.consultarPorIndice(numero);
        if (indice != -1) {
            for (let i = indice; i < this.contas.length; i++) {
                this.contas[i] = this.contas[i + 1];
            }
            this.contas.pop();
        }
    }
    depositar(numero, valor) {
        let contaConsultada = this.consultar(numero);
        if (contaConsultada != null) {
            contaConsultada.depositar(valor);
        }
    }
    sacar(numero, valor) {
        let contaConsultada = this.consultar(numero);
        if (contaConsultada != null) {
            contaConsultada.sacar(valor);
        }
    }
    transferir(numeroCredito, numeroDebito, valor) {
        let contaCredito = this.consultar(numeroCredito);
        let contaDebito = this.consultar(numeroDebito);
        if (contaDebito && contaCredito) {
            contaDebito.transferir(contaCredito, valor);
        }
    }
    getTotalDepositado() {
        // solução 1
        let totalDepositado = this.contas.reduce((totalAcumulado, conta) => {
            return totalAcumulado + conta.obterSaldo();
        }, 0);
        return totalDepositado;
        /* solução 2
        let totalDepositado: number = 0
        this.contas.forEach(conta => totalDepositado += conta.saldo);

        return totalDepositado;
        */
    }
    getTotalContas() {
        return this.contas.length;
    }
    getMediaDepositada() {
        return this.getTotalDepositado() / this.getTotalContas();
    }
}
class ValorVazioError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'ValorVazioError';
    }
}
class NumeroInvalidoError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'NumeroInvalidoError';
    }
}
let input = (0, prompt_sync_1.default)();
let b = new Banco();
let opcao = 0;
function inputComValidacao(mensagem) {
    let valor = input(mensagem);
    if (valor.trim() === '') {
        throw new ValorVazioError('O valor não pode ser vazio.');
    }
    return valor;
}
function inputNumeroComValidacao(mensagem) {
    let valor = inputComValidacao(mensagem);
    let numero = parseFloat(valor);
    if (isNaN(numero)) {
        throw new NumeroInvalidoError('Digite um número válido.');
    }
    return numero;
}
function cadastrar() {
    console.log("\nCadastrar conta\n");
    let numero = inputComValidacao('Digite o número da conta:');
    let conta = new Conta(numero, 0);
    b.inserir(conta);
    exibirConta(numero);
}
function consultarSaldo() {
    console.log("\nConsultar saldo\n");
    let numero = inputComValidacao('Digite o número da conta:');
    let conta = b.consultar(numero);
    exibirConta(conta.numero);
}
function sacar() {
    console.log("\nSacar\n");
    let numero = inputComValidacao('Digite o número da conta:');
    let valor = inputNumeroComValidacao('Digite o valor a sacar:');
    b.sacar(numero, valor);
    exibirConta(numero);
}
function depositar() {
    console.log("\nDepositar em conta\n");
    let numero = inputComValidacao('Digite o número da conta:');
    let valor = inputNumeroComValidacao('Digite o valor a depositar:');
    b.depositar(numero, valor);
    exibirConta(numero);
}
function excluir() {
    console.log("\nExcluir conta\n");
    let numero = inputComValidacao('Digite o número da conta a excluir:');
    b.excluir(numero);
    console.log(`Conta ${numero} excluída com sucesso.`);
}
function transferir() {
    console.log("\nTransferir entre contas\n");
    let origem = inputComValidacao('Digite o número da conta de origem:');
    let destino = inputComValidacao('Digite o número da conta de destino:');
    let valor = inputNumeroComValidacao('Digite o valor a transferir:');
    b.transferir(origem, destino, valor);
    console.log(`Transferência de R$${valor.toFixed(2)} da conta ${origem} para a conta ${destino} realizada com sucesso.`);
}
function exibirTotalizacoes() {
    console.log("\nTotalizações\n");
    console.log(`Total de contas cadastradas: ${b.getTotalContas()}`);
    console.log(`Total de saldo em todas as contas: R$${b.getTotalSaldo().toFixed(2)}`);
}
function exibirConta(numero) {
    let conta = b.consultar(numero);
    console.log(`Número: ${conta.numero} - Saldo: R$${conta.saldo.toFixed(2)}`);
}
do {
    console.log('\nBem-vindo\nDigite uma opção:');
    console.log('1 - Cadastrar       2 - Consultar saldo       3 - Sacar\n' +
        '4 - Depositar       5 - Excluir               6 - Transferir\n' +
        '7 - Totalizações     0 - Sair\n');
    try {
        opcao = inputNumeroComValidacao("Opção:");
        switch (opcao) {
            case 1:
                cadastrar();
                break;
            case 2:
                consultarSaldo();
                break;
            case 3:
                sacar();
                break;
            case 4:
                depositar();
                break;
            case 5:
                excluir();
                break;
            case 6:
                transferir();
                break;
            case 7:
                exibirTotalizacoes();
                break;
            default:
                throw new NumeroInvalidoError('Opção inválida. Digite um número válido.');
        }
    }
    catch (e) {
        if (e instanceof ValorVazioError || e instanceof NumeroInvalidoError) {
            console.log('Erro: ' + e.message);
        }
        else if (e instanceof AplicacaoError) {
            console.log(e.message);
        }
        else if (e instanceof PoupancaInvalidaError) {
            console.log(e.message);
        }
        else if (e instanceof ContaInexistenteError) {
            console.log(e.message);
        }
        else if (e instanceof SaldoInsuficienteError) {
            console.log(e.message);
        }
        else if (e instanceof Error) {
            console.log('Erro no sistema, contate o administrador!');
        }
    }
    finally {
        input("\nOperação finalizada. Digite <enter>");
    }
} while (opcao !== 0);
console.log("Aplicação encerrada");
