//05)Instancie uma classe banco e crie duas contas. Adicione-as à instancia do banco. Chame o método transferir novamente passando um valor que lance a exceção na classe conta. Você considera que o lançamento da exceção foi “propagado” para o método conta.transferir(), banco.transferir() e o método transferir do script app? Como você avalia a confiabilidade dessa implementação.

//como só está presente na classe conta, na classe banco não há um tratamento para esse erro, tornado o código não tão robusto e confiável.


class Conta3 {
    numero: String;
    saldo: number;

    constructor(numero: String, saldoInicial: number) {
        this.numero = numero;
        this.saldo = saldoInicial;
    }

    sacar(valor: number): void {
        if (this.saldo >= valor) {
            this.saldo = this.saldo - valor;
        } else {
            throw new Error("sem saldo");

        }
    }

    depositar(valor: number): void {
        this.saldo = this.saldo + valor;
    }

    transferir(contaDestino: Conta3, valor: number): void {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }

    obterSaldo(): number {
        return this.saldo;
    }

}

class Banco {
    contas: Conta3[] = [];

    inserir(conta: Conta3): void {
        let contaConsultada = this.consultar(conta.numero);

        if (contaConsultada == null) {
            this.contas.push(conta);
        }
    }

    consultar(numero: String): Conta3 {
        let contaConsultada!: Conta3;
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

    alterar(conta: Conta3): void {
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

let b: Banco = new Banco();
b.inserir(new Conta3("11111-1", 100));
b.inserir(new Conta3("22222-2", 150));
b.transferir("11111-1", "22222-2", 200);