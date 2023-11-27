"use strict";
//11) Você percebeu que o código que valida se o valor é menor ou igual a zero se repete nos métodos sacar e depositar? Refatore o código criando um método privado chamado validarValor onde um valor é passado como parâmetro e caso o mesmo seja menor ou igual a zero, seja lançada uma exceção. Altere também os métodos sacar e depositar para chamar esse método de validação em vez de cada um lançar a sua própria exceção, evitando assim a duplicação de código.
class AplicacaoError4 extends Error {
    constructor(message) {
        super(message);
    }
}
class ValorInvalidoError2 extends AplicacaoError4 {
    constructor(message) {
        super(message);
    }
}
class ContaInexistenteError4 extends AplicacaoError4 {
    constructor(message) {
        super(message);
    }
}
class SaldoInsuficienteError4 extends AplicacaoError4 {
    constructor(message) {
        super(message);
    }
}
class Conta8 {
    constructor(numero, saldoInicial) {
        this.saldo = 0;
        if (saldoInicial < 0) {
            throw new Error("Saldo não pode ser negativo");
        }
        this.numero = numero;
        this.depositar(saldoInicial);
    }
    sacar(valor) {
        validarValor(valor);
        if (this.saldo >= valor) {
            this.saldo = this.saldo - valor;
        }
        else {
            throw new Error("sem saldo");
        }
    }
    depositar(valor) {
        validarValor(valor);
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
class Banco6 {
    constructor() {
        this.contas = [];
    }
    inserir(conta) {
        // Verifica se a conta já existe
        const contaExistente = this.contas.find(c => c.numero === conta.numero);
        if (contaExistente) {
            throw new ContaInexistenteError4(`Conta com número ${conta.numero} já existe.`);
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
            throw new ContaInexistenteError4(`Conta com número ${numero} não encontrada.`);
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
            throw new ContaInexistenteError4(`Conta com número ${numero} não encontrada.`);
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
function validarValor(v) {
    if (v <= 0) {
        throw new ValorInvalidoError2("Valor do depósito deve ser maior que zero");
    }
}
//testando
let b6 = new Banco6();
b6.inserir(new Conta8('1', 100));
console.log(b6.consultar('1'));
//testando o erro
console.log(b6.depositar('1', -10));
