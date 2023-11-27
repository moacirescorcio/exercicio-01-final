"use strict";
//13) Crie uma validação para não cadastrar mais de uma conta com o mesmo número. Para isso, chame o método consultar no método inserir da classe banco. Apenas se a exceção do método consultar for lançada, você deve incluir a conta. Para isso, consulte a conta dentro de um try e o faça a inclusão no catch.
class AplicacaoError5 extends Error {
    constructor(message) {
        super(message);
    }
}
class PoupancaInvalidaError extends AplicacaoError5 {
    constructor(message) {
        super(message);
    }
}
class ValorInvalidoError3 extends AplicacaoError5 {
    constructor(message) {
        super(message);
    }
}
class ContaInexistenteError5 extends AplicacaoError5 {
    constructor(message) {
        super(message);
    }
}
class SaldoInsuficienteError5 extends AplicacaoError5 {
    constructor(message) {
        super(message);
    }
}
class Conta9 {
    constructor(numero, saldoInicial) {
        this.saldo = 0;
        if (saldoInicial < 0) {
            throw new Error("Saldo não pode ser negativo");
        }
        this.numero = numero;
        this.depositar(saldoInicial);
    }
    sacar(valor) {
        validarValor2(valor);
        if (this.saldo >= valor) {
            this.saldo = this.saldo - valor;
        }
        else {
            throw new Error("sem saldo");
        }
    }
    depositar(valor) {
        validarValor2(valor);
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
class ContaPoupanca extends Conta9 {
    constructor(numero, valor) {
        super(numero, valor);
    }
    renderizarJuros() {
        const juros = this.saldo * 0.05;
        this.depositar(juros);
    }
}
class Banco7 {
    constructor() {
        this.contas = [];
    }
    inserir(conta) {
        try {
            this.consultar(conta.numero);
        }
        catch (e) {
            if (!(e instanceof ContaInexistenteError5)) {
                console.log(e.message);
            }
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
            throw new ContaInexistenteError5(`Conta com número ${numero} não encontrada.`);
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
            throw new ContaInexistenteError5(`Conta com número ${numero} não encontrada.`);
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
    renderJuros(numero) {
        const conta = this.consultar(numero);
        // Verifica se a conta é uma poupança
        if (!(conta instanceof ContaPoupanca)) {
            throw new PoupancaInvalidaError("Apenas contas poupança podem render juros.");
        }
        conta.renderizarJuros();
    }
}
function validarValor2(v) {
    if (v <= 0) {
        throw new ValorInvalidoError3("Valor do depósito deve ser maior que zero");
    }
}
let b7 = new Banco7();
b7.inserir(new ContaPoupanca('123', 1000));
b7.inserir(new Conta9('222', 100));
console.log('Saldo antes dos juros:', b7.consultar('123'));
b7.renderJuros('123'); // Renderizar juros com uma taxa de 5%
console.log('Saldo após os juros:', b7.consultar('123'));
//testando o erro
//b7.renderJuros('222');
//testando erro de inserir
b7.inserir(new Conta9('222', 100));
console.log(b7.consultar('222'));
