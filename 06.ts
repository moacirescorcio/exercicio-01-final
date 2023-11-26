//6) Lance um erro no construtor e nos métodos sacar e depositar para que, caso o valor passado seja menor que zero uma exceção seja lançada. Reexecute os testes da questão anterior com valores que “passem” pelo saldo insuficiente, e teste também a chamada dos métodos passando como parâmetro valores < 0.

class Conta4 {
    numero: String;
    saldo: number;

    constructor(numero: String, saldoInicial: number) {
        if(saldoInicial < 0){
            throw new Error("Saldo não pode ser negativo")
        }

        this.numero = numero;
        this.saldo = saldoInicial;
    }

    sacar(valor: number): void {
        if(valor < 0){
            throw new Error("Valor não pode ser negativo")
        }

        if (this.saldo >= valor) {
            this.saldo = this.saldo - valor;
        } else {
            throw new Error("sem saldo");

        }
    }

    depositar(valor: number): void {
        if(valor < 0){
            throw new Error("Valor não pode ser negativo")
        }
        this.saldo = this.saldo + valor;
    }

    transferir(contaDestino: Conta4, valor: number): void {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }

    obterSaldo(): number {
        return this.saldo;
    }

}

class Banco2 {
    contas: Conta4[] = [];

    inserir(conta: Conta4): void {
        let contaConsultada = this.consultar(conta.numero);

        if (contaConsultada == null) {
            this.contas.push(conta);
        }
    }

    consultar(numero: String): Conta4 {
        let contaConsultada!: Conta4;
        for (let conta of this.contas) {
            if (conta.numero == numero) {
                contaConsultada = conta;
                break;
            }
        }
        return contaConsultada;
    }

    consultarPorIndice(numero: String): number {
        let indice: number = -1;
        for (let i: number = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                indice = i;
                break;
            }
        }
        return indice;
    }

    alterar(conta: Conta4): void {
        let indice: number = this.consultarPorIndice(conta.numero);

        if (indice != -1) {
            this.contas[indice] = conta;
        }
    }

    excluir(numero: string): void {
        let indice: number = this.consultarPorIndice(numero);

        if (indice != -1) {
            for (let i: number = indice; i < this.contas.length; i++) {
                this.contas[i] = this.contas[i + 1];
            }

            this.contas.pop();
        }
    }

    depositar(numero: String, valor: number): void {
        let contaConsultada = this.consultar(numero);

        if (contaConsultada != null) {
            contaConsultada.depositar(valor);
        }
    }

    sacar(numero: String, valor: number): void {
        let contaConsultada = this.consultar(numero);

        if (contaConsultada != null) {
            contaConsultada.sacar(valor);
        }
    }

    transferir(numeroCredito: string, numeroDebito: string, valor: number): void {
        let contaCredito = this.consultar(numeroCredito);
        let contaDebito = this.consultar(numeroDebito);
        contaDebito.transferir(contaCredito, valor);
    }
}

let b2: Banco2 = new Banco2();
b2.inserir(new Conta4("11111-1", 100));
console.log(b2.consultar("11111-1"));

//b2.inserir(new Conta4("22222-2", -150));
//b2.transferir("11111-1", "22222-2", 200);

//metado com negativo
b2.depositar("11111-1", -200)