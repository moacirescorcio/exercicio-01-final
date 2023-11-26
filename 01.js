"use strict";
//1) Enumere os 3 tipos mais comuns de tratamento de erros e exemplifique com códigos seus ou pesquisados na internet.
//desconsiderar operação
class ProcessoDeCompra {
    constructor(numeroPedido, valorTotal, limiteCredito) {
        this.numeroPedido = numeroPedido;
        this.valorTotal = valorTotal;
        this.limiteCredito = limiteCredito;
    }
    realizarCompra() {
        if (this.valorTotal <= this.limiteCredito) {
            this.limiteCredito -= this.valorTotal; //não sabemos se houve sucesso ou não na operação
        }
    }
}
//exibir mensagem de erro
class ProcessoDeCompra2 {
    constructor(numeroPedido, valorTotal, limiteCredito) {
        this.numeroPedido = numeroPedido;
        this.valorTotal = valorTotal;
        this.limiteCredito = limiteCredito;
    }
    realizarCompra() {
        if (this.valorTotal <= this.limiteCredito) {
            this.limiteCredito -= this.valorTotal;
        }
        else {
            console.log("Limite de crédito insuficiente para realizar a compra.");
        } //fica atrelado a interface do texto
    }
}
//retornar código de erro
class ProcessoDeCompra3 {
    constructor(numeroPedido, valorTotal, limiteCredito) {
        this.numeroPedido = numeroPedido;
        this.valorTotal = valorTotal;
        this.limiteCredito = limiteCredito;
    }
    realizarCompra() {
        if (this.valorTotal <= this.limiteCredito) {
            this.limiteCredito -= this.valorTotal;
            return true;
        }
        else {
            return false;
        }
    }
}
//2) Explique por que cada um dos 3 métodos acima possui limitações de uso.
//O primeiro pois não sabemos se houve ou não sucesso na operação, o segundo pois fica atrelado a interface do texto e o último pois é preciso testar os valores de retorno para saber o que houve.
