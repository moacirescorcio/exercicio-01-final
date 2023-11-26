"use strict";
//3) Implemente como nos slides o lançamento da exceção no método sacar e realize um teste para saques que deixariam o saldo negativo.
class Conta {
    constructor(numero, saldoInicial) {
        this._numero = numero;
        this._saldo = saldoInicial;
    }
    get saldo() {
        return this._saldo;
    }
    sacar(valor) {
        if (this._saldo < valor) {
            throw new Error('Saldo insuficiente.');
        }
        this._saldo = this._saldo - valor;
    }
}
let conta = new Conta('1', 50);
conta.sacar(50);
conta.sacar(10);
