//10) Crie uma exceção chamada ValorInvalidoError que herda de AplicacaoException e altere a classe Conta para que ao receber um crédito/depósito, caso o valor seja menor ou igual a zero, seja lançada a exceção ValorInvalidoError. Altere também o construtor da classe Conta para que o saldo inicial seja atribuído utilizando o método depositar.



class AplicacaoError3 extends Error {
    constructor(message: string) {
        super(message);
    }
}

class ValorInvalidoError extends AplicacaoError3{
    constructor(message: string){
        super(message);
    }
}

class ContaInexistenteError3 extends AplicacaoError3 {
    constructor(message: string) {
        super(message);
    }
}

class SaldoInsuficienteError3 extends AplicacaoError3 {
    constructor(message: string) {
        super(message);
    }
}

class Conta7 {
    numero: string;
    saldo: number = 0;

    constructor(numero: string, saldoInicial: number) {
        if (saldoInicial < 0) {
            throw new Error("Saldo não pode ser negativo")
        }

        this.numero = numero;
        this.depositar(saldoInicial);
    }

    sacar(valor: number): void {
        if (valor < 0) {
            throw new Error("Valor não pode ser negativo")
        }

        if (this.saldo >= valor) {
            this.saldo = this.saldo - valor;
        } else {
            throw new Error("sem saldo");

        }
    }

    depositar(valor: number): void {
        if (valor < 0) {
            throw new ValorInvalidoError("Valor do depósito deve ser maior que zero");
        }
        this.saldo = this.saldo + valor;
    }

    transferir(contaDestino: Conta7, valor: number): void {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }

    obterSaldo(): number {
        return this.saldo;
    }

}

class Banco5 {
    contas: Conta7[] = [];

    inserir(conta: Conta7): void {
        // Verifica se a conta já existe
        const contaExistente = this.contas.find(c => c.numero === conta.numero);

        if (contaExistente) {
            throw new ContaInexistenteError3(`Conta com número ${conta.numero} já existe.`);
        }

        // Se a conta não existe, insere
        this.contas.push(conta);
    }

    consultar(numero: string): Conta7 {
        let contaConsultada: Conta7 | undefined;
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

    consultarPorIndice(numero: string): number {
        let indice: number = -1;
        for (let i: number = 0; i < this.contas.length; i++) {
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

    alterar(conta: Conta7): void {
        let indice: number = this.consultarPorIndice(conta.numero);
        this.contas[indice] = conta;

    }

    excluir(numero: string): void {
        let indice: number = this.consultarPorIndice(numero);


        for (let i: number = indice; i < this.contas.length; i++) {
            this.contas[i] = this.contas[i + 1];
        }

        this.contas.pop();

    }

    depositar(numero: string, valor: number): void {
        let contaConsultada = this.consultar(numero);
        contaConsultada.depositar(valor);

    }

    sacar(numero: string, valor: number): void {
        let contaConsultada = this.consultar(numero);
        contaConsultada.sacar(valor);

    }

    transferir(numeroCredito: string, numeroDebito: string, valor: number): void {
        let contaCredito = this.consultar(numeroCredito);
        let contaDebito = this.consultar(numeroDebito);
        contaDebito.transferir(contaCredito, valor);
    }
}

let b5: Banco5 = new Banco5();
b5.inserir(new Conta7('1', 100));
console.log(b5.consultar('1'));

//testando o erro
console.log(b5.depositar('1', -10));
