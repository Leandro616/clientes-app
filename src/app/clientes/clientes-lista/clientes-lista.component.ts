import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
   selector: 'app-clientes-lista',
   templateUrl: './clientes-lista.component.html',
   styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

   clientes: Cliente[] = [];
   clienteSelecinado: Cliente;
   mensagemSucesso: string;
   mensagemErro: string;

   constructor(
      private service: ClientesService,
      private router: Router) { }

   ngOnInit(): void {
      this.service.getClientes()
         .subscribe(response => this.clientes = response);
   }

   novoCadastro() {
      this.router.navigate(['clientes/form']);
   }

   preparaDelecao(cliente: Cliente) {
      this.clienteSelecinado = cliente;
   }

   deletarCliente() {
      this.service.deletar(this.clienteSelecinado)
         .subscribe(
            resposta => {
               this.mensagemSucesso = "Cliente exlcuído com sucesso!";
               // esse metodo vai relistar os clientes
               this.ngOnInit()
            },
            erro => this.mensagemErro = "Ocorreu um erro ao deletar cliente."
         )
   }

}
