//4) Crie duas contas e teste o método transferir de modo que a conta a ser debitada não possua saldo suficiente. Explique o que ocorreu.

//como não tem saldo suficiente o erro bloqueia o prosseguimento do programa e para a execução.

class Conta2 {
	numero: String;
	saldo: number;

	constructor(numero: String, saldoInicial: number) {
		this.numero = numero;
		this.saldo = saldoInicial;
	}

	sacar(valor: number): void {
		if (this.saldo >= valor) {
			this.saldo = this.saldo - valor;
		}else{
            throw new Error("sem saldo");
            
        }
	}

	depositar(valor: number): void {
		this.saldo = this.saldo + valor;
	}

	transferir(contaDestino: Conta2, valor: number): void {
		this.sacar(valor);
		contaDestino.depositar(valor);
	}

	obterSaldo(): number {
		return this.saldo;
	}

}

let conta1: Conta2 = new Conta2('1', 100);
let conta2: Conta2 = new Conta2('2', 100);
conta1.transferir(conta2, 200);
console.log(conta1.saldo);
console.log(conta2.saldo);
