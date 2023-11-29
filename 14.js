"use strict";
//14) Altere a aplicação “app.ts” para que tenha um tratamento de exceções no do {} while mostra a estrutura do slide “Aplicação Robusta”.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const _13_1 = require("./13");
let input = (0, prompt_sync_1.default)();
let b = new _13_1.Banco7();
let opcao = '';
do {
    console.log('\nBem-vindo\nDigite uma opção:');
    console.log('1 - Cadastrar       2 - Consultar saldo       3 - Sacar\n' +
        '4 - Depositar       5 - Excluir               6 - Transferir\n' +
        '7 - Totalizações     0 - Sair\n');
    opcao = input("Opção:");
    try {
        switch (opcao) {
            case "1":
                cadastrar();
                break;
            case "2":
                consultarSaldo();
                break;
            case "3":
                sacar();
                break;
            case "4":
                depositar();
                break;
            case "5":
                excluir();
                break;
            case "6":
                transferir();
                break;
            case "7":
                exibirTotalizacoes();
                break;
        }
    }
    catch (e) {
        if (e instanceof _13_1.AplicacaoError5) {
            console.log(e.message);
        }
        else if (e instanceof _13_1.PoupancaInvalidaError) {
            console.log(e.message);
        }
        else if (e instanceof _13_1.ValorInvalidoError3) {
            console.log(e.message);
        }
        else if (e instanceof _13_1.ContaInexistenteError5) {
            console.log(e.message);
        }
        else if (e instanceof _13_1.SaldoInsuficienteError5) {
            console.log(e.message);
        }
        else if (e instanceof Error) {
            console.log('Erro no sistema, conta9te o administrador!');
        }
    }
    finally {
        input("\nOperação finalizada. Digite <enter>");
    }
} while (opcao !== "0");
console.log("Aplicação encerrada");
function cadastrar() {
    console.log("\nCadastrar conta9\n");
    let numero = input('Digite o número da conta9:');
    try {
        b.inserir(new _13_1.Conta9(numero, 100));
        exibirConta9(numero);
    }
    catch (e) {
        if (e instanceof _13_1.ContaInexistenteError5) {
            console.log(`Conta9 ${numero} já existe.`);
        }
        else {
            throw e;
        }
    }
}
function consultarSaldo() {
    console.log("\nConsultar saldo\n");
    let numero = input('Digite o número da conta9:');
    let conta9 = b.consultar(numero);
    exibirConta9(conta9.numero);
}
function sacar() {
    console.log("\nSacar\n");
    let numero = input('Digite o número da conta9:');
    let valor = parseFloat(input('Digite o valor a sacar:'));
    b.sacar(numero, valor);
    exibirConta9(numero);
}
function depositar() {
    console.log("\nDepositar em conta9\n");
    let numero = input('Digite o número da conta9:');
    let valor = parseFloat(input('Digite o valor a depositar:'));
    b.depositar(numero, valor);
    exibirConta9(numero);
}
function excluir() {
    console.log("\nExcluir conta9\n");
    let numero = input('Digite o número da conta9 a excluir:');
    b.excluir(numero);
    console.log(`Conta9 ${numero} excluída com sucesso.`);
}
function transferir() {
    console.log("\nTransferir entre conta9s\n");
    let origem = input('Digite o número da conta9 de origem:');
    let destino = input('Digite o número da conta9 de destino:');
    let valor = parseFloat(input('Digite o valor a transferir:'));
    b.transferir(origem, destino, valor);
    console.log(`Transferência de R$${valor.toFixed(2)} da conta9 ${origem} para a conta9 ${destino} realizada com sucesso.`);
}
function exibirTotalizacoes() {
    console.log("\nTotalizações\n");
    console.log(`Total de conta9s cadastradas: ${b.getTotalContas()}`);
    console.log(`Total de saldo em todas as conta9s: R$${b.getTotalSaldo().toFixed(2)}`);
}
function exibirConta9(numero) {
    let conta9 = b.consultar(numero);
    console.log(`Número: ${conta9.numero} - Saldo: R$${conta9.saldo.toFixed(2)}`);
}
