"use strict";
//6) Lance um erro no construtor e nos métodos sacar e depositar para que, caso o valor passado seja menor que zero uma exceção seja lançada. Reexecute os testes da questão anterior com valores que “passem” pelo saldo insuficiente, e teste também a chamada dos métodos passando como parâmetro valores < 0.
class Conta4 {
    constructor(numero, saldoInicial) {
        if (saldoInicial < 0) {
            throw new Error("Saldo não pode ser negativo");
        }
        this.numero = numero;
        this.saldo = saldoInicial;
    }
    sacar(valor) {
        if (valor < 0) {
            throw new Error("Valor não pode ser negativo");
        }
        if (this.saldo >= valor) {
            this.saldo = this.saldo - valor;
        }
        else {
            throw new Error("sem saldo");
        }
    }
    depositar(valor) {
        if (valor < 0) {
            throw new Error("Valor não pode ser negativo");
        }
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
class Banco2 {
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
        contaDebito.transferir(contaCredito, valor);
    }
}
let b2 = new Banco2();
b2.inserir(new Conta4("11111-1", 100));
console.log(b2.consultar("11111-1"));
//b2.inserir(new Conta4("22222-2", -150));
//b2.transferir("11111-1", "22222-2", 200);
//metado com negativo
b2.depositar("11111-1", -200);
