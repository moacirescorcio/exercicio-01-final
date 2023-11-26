//3) Implemente como nos slides o lançamento da exceção no método sacar e realize um teste para saques que deixariam o saldo negativo.

class Conta {
    private _numero: String;
    private _saldo: number;
    constructor(numero: String, saldoInicial: number) {
        this._numero = numero;
        this._saldo = saldoInicial;
    }
    get saldo() {
        return this._saldo;
    }
    sacar(valor: number): void {
        if (this._saldo < valor) {
            throw new Error('Saldo insuficiente.')
        }

        this._saldo = this._saldo - valor;
    }
}

let conta: Conta = new Conta('1', 50);
conta.sacar(50);
conta.sacar(10);