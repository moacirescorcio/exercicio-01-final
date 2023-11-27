//11) Você percebeu que o código que valida se o valor é menor ou igual a zero se repete nos métodos sacar e depositar? Refatore o código criando um método privado chamado validarValor onde um valor é passado como parâmetro e caso o mesmo seja menor ou igual a zero, seja lançada uma exceção. Altere também os métodos sacar e depositar para chamar esse método de validação em vez de cada um lançar a sua própria exceção, evitando assim a duplicação de código.

class AplicacaoError4 extends Error {
    constructor(message: string) {
        super(message);
    }
}

class ValorInvalidoError2 extends AplicacaoError4{
    constructor(message: string){
        super(message);
    }
}

class ContaInexistenteError4 extends AplicacaoError4 {
    constructor(message: string) {
        super(message);
    }
}

class SaldoInsuficienteError4 extends AplicacaoError4 {
    constructor(message: string) {
        super(message);
    }
}

class Conta8 {
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
        validarValor(valor);

        if (this.saldo >= valor) {
            this.saldo = this.saldo - valor;
        } else {
            throw new Error("sem saldo");

        }
    }

    depositar(valor: number): void {
        validarValor(valor);
        this.saldo = this.saldo + valor;
    }

    transferir(contaDestino: Conta8, valor: number): void {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }

    obterSaldo(): number {
        return this.saldo;
    }

}

class Banco6 {
    contas: Conta8[] = [];

    inserir(conta: Conta8): void {
        // Verifica se a conta já existe
        const contaExistente = this.contas.find(c => c.numero === conta.numero);

        if (contaExistente) {
            throw new ContaInexistenteError4(`Conta com número ${conta.numero} já existe.`);
        }

        // Se a conta não existe, insere
        this.contas.push(conta);
    }

    consultar(numero: string): Conta8 {
        let contaConsultada: Conta8 | undefined;
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

    consultarPorIndice(numero: string): number {
        let indice: number = -1;
        for (let i: number = 0; i < this.contas.length; i++) {
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

    alterar(conta: Conta8): void {
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

function validarValor(v: number):void{
    if(v <= 0){
        throw new ValorInvalidoError2("Valor do depósito deve ser maior que zero");
        
    }
}

//testando
let b6: Banco6 = new Banco6();
b6.inserir(new Conta8('1', 100));
console.log(b6.consultar('1'));

//testando o erro
console.log(b6.depositar('1', -10));

