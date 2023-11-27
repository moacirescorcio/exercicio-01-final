//12) Crie uma exceção chamada PoupancaInvalidaError que herda de AplicacaoError. Altere então o método render juros da classe Banco para que caso a conta não seja uma poupança, a exceção criada seja lançada.



class AplicacaoError5 extends Error {
    constructor(message: string) {
        super(message);
    }
}

class PoupancaInvalidaError extends AplicacaoError5{
    constructor(message: string){
        super(message);
    }
}

class ValorInvalidoError3 extends AplicacaoError5{
    constructor(message: string){
        super(message);
    }
}

class ContaInexistenteError5 extends AplicacaoError5 {
    constructor(message: string) {
        super(message);
    }
}

class SaldoInsuficienteError5 extends AplicacaoError5 {
    constructor(message: string) {
        super(message);
    }
}

class Conta9 {
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
        validarValor2(valor);

        if (this.saldo >= valor) {
            this.saldo = this.saldo - valor;
        } else {
            throw new Error("sem saldo");

        }
    }

    depositar(valor: number): void {
        validarValor2(valor);
        this.saldo = this.saldo + valor;
    }

    transferir(contaDestino: Conta9, valor: number): void {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }

    obterSaldo(): number {
        return this.saldo;
    }

}

class ContaPoupanca extends Conta9 {
    constructor(numero: string, valor:number){
        super(numero,valor);
    }

    renderizarJuros(): void {
        const juros = this.saldo * 0.05;
        this.depositar(juros);
    }
}

class Banco7 {
    contas: Conta9[] = [];

    inserir(conta: Conta9): void {
        // Verifica se a conta já existe
        const contaExistente = this.contas.find(c => c.numero === conta.numero);

        if (contaExistente) {
            throw new ContaInexistenteError5(`Conta com número ${conta.numero} já existe.`);
        }

        // Se a conta não existe, insere
        this.contas.push(conta);
    }

    consultar(numero: string): Conta9 {
        let contaConsultada: Conta9 | undefined;
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

    consultarPorIndice(numero: string): number {
        let indice: number = -1;
        for (let i: number = 0; i < this.contas.length; i++) {
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

    alterar(conta: Conta9): void {
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

    renderJuros(numero: string): void {
        const conta = this.consultar(numero);

        // Verifica se a conta é uma poupança
        if (!(conta instanceof ContaPoupanca)) {
            throw new PoupancaInvalidaError("Apenas contas poupança podem render juros.");
        }

        conta.renderizarJuros();
    }
}

function validarValor2(v: number):void{
    if(v <= 0){
        throw new ValorInvalidoError3("Valor do depósito deve ser maior que zero");
        
    }
}

let b7: Banco7 = new Banco7();
b7.inserir(new ContaPoupanca('123', 1000));
b7.inserir(new Conta9('222', 100));

console.log('Saldo antes dos juros:', b7.consultar('123'));
b7.renderJuros('123'); // Renderizar juros com uma taxa de 5%
console.log('Saldo após os juros:', b7.consultar('123'));

//testando o erro
b7.renderJuros('222');

