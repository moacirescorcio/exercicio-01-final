"use strict";
//10) Crie uma exceção chamada ValorInvalidoError que herda de AplicacaoException e altere a classe Conta para que ao receber um crédito/depósito, caso o valor seja menor ou igual a zero, seja lançada a exceção ValorInvalidoError. Altere também o construtor da classe Conta para que o saldo inicial seja atribuído utilizando o método depositar.
class AplicacaoError3 extends Error {
    constructor(message) {
        super(message);
    }
}
class ValorInvalidoError extends AplicacaoError3 {
    constructor(message) {
        super(message);
    }
}
class ContaInexistenteError3 extends AplicacaoError3 {
    constructor(message) {
        super(message);
    }
}
class SaldoInsuficienteError3 extends AplicacaoError3 {
    constructor(message) {
        super(message);
    }
}
class Conta7 {
    constructor(numero, saldoInicial) {
        this.saldo = 0;
        if (saldoInicial < 0) {
            throw new Error("Saldo não pode ser negativo");
        }
        this.numero = numero;
        this.depositar(saldoInicial);
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
            throw new ValorInvalidoError("Valor do depósito deve ser maior que zero");
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
class Banco5 {
    constructor() {
        this.contas = [];
    }
    inserir(conta) {
        // Verifica se a conta já existe
        const contaExistente = this.contas.find(c => c.numero === conta.numero);
        if (contaExistente) {
            throw new ContaInexistenteError3(`Conta com número ${conta.numero} já existe.`);
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
            throw new ContaInexistenteError3(`Conta com número ${numero} não encontrada.`);
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
            throw new ContaInexistenteError3(`Conta com número ${numero} não encontrada.`);
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
let b5 = new Banco5();
b5.inserir(new Conta7('1', 100));
console.log(b5.consultar('1'));
//testando o erro
console.log(b5.depositar('1', -10));
