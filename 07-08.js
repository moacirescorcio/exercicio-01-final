"use strict";
//7) Crie as classes AplicacaoError descendente de Error. Crie também classes ContaInexistenteError e SaldoInsuficienteError. Todas decendentes da classe AplicacaoError.
//8) Implemente na classe Banco os métodos consultar e consultarPorIndice para que, caso a conta procurada não seja encontrada, a exceção ContaInexistente seja lançada.
class AplicacaoError extends Error {
    constructor(message) {
        super(message);
    }
}
class ContaInexistenteError extends AplicacaoError {
    constructor(message) {
        super(message);
    }
}
class SaldoInsuficienteError extends AplicacaoError {
    constructor(message) {
        super(message);
    }
}
class Conta5 {
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
class Banco3 {
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
        if (contaConsultada == undefined) {
            throw new ContaInexistenteError(`Conta com número ${numero} não encontrada.`);
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
            throw new ContaInexistenteError(`Conta com número ${numero} não encontrada.`);
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
let b3 = new Banco3();
b3.inserir(new Conta5("11111-1", 100));
console.log(b2.consultar("11111-2"));
