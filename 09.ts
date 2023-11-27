//09) Altere os métodos alterar, depositar, sacar, transferir, renderJuros removendo os “ifs/elses”, pois caso haja exceção no método consultar, os respectivos códigos não serão mais necessários. Ex:

class AplicacaoError2 extends Error {
    constructor(message: string) {
        super(message);
    }
}

class ContaInexistenteError2 extends AplicacaoError2 {
    constructor(message: string) {
        super(message);
    }
}

class SaldoInsuficienteError2 extends AplicacaoError2 {
    constructor(message: string) {
        super(message);
    }
}

class Conta6 {
    numero: string;
    saldo: number;

    constructor(numero: string, saldoInicial: number) {
        if (saldoInicial < 0) {
            throw new Error("Saldo não pode ser negativo")
        }

        this.numero = numero;
        this.saldo = saldoInicial;
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
            throw new Error("Valor não pode ser negativo")
        }
        this.saldo = this.saldo + valor;
    }

    transferir(contaDestino: Conta6, valor: number): void {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }

    obterSaldo(): number {
        return this.saldo;
    }

}

class Banco4 {
    contas: Conta6[] = [];

    inserir(conta: Conta6): void {
        // Verifica se a conta já existe
        const contaExistente = this.contas.find(c => c.numero === conta.numero);

        if (contaExistente) {
            throw new ContaInexistenteError2(`Conta com número ${conta.numero} já existe.`);
        }

        // Se a conta não existe, insere
        this.contas.push(conta);
    }

    consultar(numero: string): Conta6 {
        let contaConsultada: Conta6 | undefined;
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

    consultarPorIndice(numero: string): number {
        let indice: number = -1;
        for (let i: number = 0; i < this.contas.length; i++) {
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

    alterar(conta: Conta6): void {
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

let b4: Banco4 = new Banco4();
b4.inserir(new Conta6('1', 100));
b4.depositar('1', 100);
console.log(b4.consultar('1'));
//testando o erro
//console.log(b4.consultar('2'));
b4.depositar('2', 100);