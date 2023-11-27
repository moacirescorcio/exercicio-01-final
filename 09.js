"use strict";
//09) Altere os métodos alterar, depositar, sacar, transferir, renderJuros removendo os “ifs/elses”, pois caso haja exceção no método consultar, os respectivos códigos não serão mais necessários. Ex:
class AplicacaoError2 extends Error {
    constructor(message) {
        super(message);
    }
}
class ContaInexistenteError2 extends AplicacaoError2 {
    constructor(message) {
        super(message);
    }
}
class SaldoInsuficienteError2 extends AplicacaoError2 {
    constructor(message) {
        super(message);
    }
}
class Conta6 {
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
class Banco4 {
    constructor() {
        this.contas = [];
    }
    inserir(conta) {
        // Verifica se a conta já existe
        const contaExistente = this.contas.find(c => c.numero === conta.numero);
        if (contaExistente) {
            throw new ContaInexistenteError2(`Conta com número ${conta.numero} já existe.`);
        }
        // Se a conta não existe, insere
        this.contas.push(conta);
    }
    consultar(numero) {
        let contaConsultada;
        for (let conta of this.contas) {
            if (conta.numero == numero) {
                contaConsultada = conta;
                break;
            }
        }
        if (contaConsultada == undefined) {
            throw new ContaInexistenteError2(`Conta com número ${numero} não encontrada.`);
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
        if (indice == -1) {
            throw new ContaInexistenteError2(`Conta com número ${numero} não encontrada.`);
        }
        return indice;
    }
    alterar(conta) {
        let indice = this.consultarPorIndice(conta.numero);
        this.contas[indice] = conta;
    }
    excluir(numero) {
        let indice = this.consultarPorIndice(numero);
        for (let i = indice; i < this.contas.length; i++) {
            this.contas[i] = this.contas[i + 1];
        }
        this.contas.pop();
    }
    depositar(numero, valor) {
        let contaConsultada = this.consultar(numero);
        contaConsultada.depositar(valor);
    }
    sacar(numero, valor) {
        let contaConsultada = this.consultar(numero);
        contaConsultada.sacar(valor);
    }
    transferir(numeroCredito, numeroDebito, valor) {
        let contaCredito = this.consultar(numeroCredito);
        let contaDebito = this.consultar(numeroDebito);
        contaDebito.transferir(contaCredito, valor);
    }
}
let b4 = new Banco4();
b4.inserir(new Conta6('1', 100));
b4.depositar('1', 100);
console.log(b4.consultar('1'));
//testando o erro
//console.log(b4.consultar('2'));
b4.depositar('2', 100);
