//14) Altere a aplicação “app.ts” para que tenha um tratamento de exceções no do {} while mostra a estrutura do slide “Aplicação Robusta”.

import prompt from "prompt-sync";
import {Banco7, Conta9, AplicacaoError5, SaldoInsuficienteError5, ValorInvalidoError3, ContaInexistenteError5, PoupancaInvalidaError} from "./13";

let input = prompt();
let b: Banco7 = new Banco7();
let opcao: string = '';

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
    } catch (e: any) {
        if (e instanceof AplicacaoError5) {
            console.log(e.message);
        } else if (e instanceof PoupancaInvalidaError) {
            console.log(e.message);
        } else if (e instanceof ValorInvalidoError3) {
            console.log(e.message);
        } else if (e instanceof ContaInexistenteError5) {
            console.log(e.message);
        } else if (e instanceof SaldoInsuficienteError5) {
            console.log(e.message);
        } else if (e instanceof Error) {
            console.log('Erro no sistema, conta9te o administrador!');
        }
    } finally {
        input("\nOperação finalizada. Digite <enter>");
    }
} while (opcao !== "0");

console.log("Aplicação encerrada");

function cadastrar(): void {
    console.log("\nCadastrar conta9\n");
    let numero: string = input('Digite o número da conta9:');
    try {
        b.inserir(new Conta9(numero, 100));
        exibirConta9(numero);
    } catch (e) {
        if (e instanceof ContaInexistenteError5) {
            console.log(`Conta9 ${numero} já existe.`);
        } else {
            throw e;
        }
    }
}

function consultarSaldo(): void {
    console.log("\nConsultar saldo\n");
    let numero: string = input('Digite o número da conta9:');
    let conta9: Conta9 = b.consultar(numero);
    exibirConta9(conta9.numero);
}

function sacar(): void {
    console.log("\nSacar\n");
    let numero: string = input('Digite o número da conta9:');
    let valor: number = parseFloat(input('Digite o valor a sacar:'));
    b.sacar(numero, valor);
    exibirConta9(numero);
}

function depositar(): void {
    console.log("\nDepositar em conta9\n");
    let numero: string = input('Digite o número da conta9:');
    let valor: number = parseFloat(input('Digite o valor a depositar:'));
    b.depositar(numero, valor);
    exibirConta9(numero);
}

function excluir(): void {
    console.log("\nExcluir conta9\n");
    let numero: string = input('Digite o número da conta9 a excluir:');
    b.excluir(numero);
    console.log(`Conta9 ${numero} excluída com sucesso.`);
}

function transferir(): void {
    console.log("\nTransferir entre conta9s\n");
    let origem: string = input('Digite o número da conta9 de origem:');
    let destino: string = input('Digite o número da conta9 de destino:');
    let valor: number = parseFloat(input('Digite o valor a transferir:'));
    b.transferir(origem, destino, valor);
    console.log(`Transferência de R$${valor.toFixed(2)} da conta9 ${origem} para a conta9 ${destino} realizada com sucesso.`);
}

function exibirTotalizacoes(): void {
    console.log("\nTotalizações\n");
    console.log(`Total de conta9s cadastradas: ${b.getTotalContas()}`);
    console.log(`Total de saldo em todas as conta9s: R$${b.getTotalSaldo().toFixed(2)}`);
}

function exibirConta9(numero: string): void {
    let conta9: Conta9 = b.consultar(numero);
    console.log(`Número: ${conta9.numero} - Saldo: R$${conta9.saldo.toFixed(2)}`);
}
