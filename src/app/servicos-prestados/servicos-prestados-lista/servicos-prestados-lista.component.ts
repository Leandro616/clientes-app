import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestadoBusca } from './servicoPrestadoBusca';

@Component({
   selector: 'app-servicos-prestados-lista',
   templateUrl: './servicos-prestados-lista.component.html',
   styleUrls: ['./servicos-prestados-lista.component.css']
})
export class ServicosPrestadosListaComponent implements OnInit {

   nome: string;
   mes: number;
   meses: number[];
   lista: ServicoPrestadoBusca[];
   mensagem: string;

   constructor(
      private service: ServicoPrestadoService
   ) {
      this.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
   }

   ngOnInit(): void {

   }

   consultar() {
      this.service.buscar(this.nome, this.mes)
         .subscribe(response => {
            this.lista = response
            if (this.lista.length == 0) {
               this.mensagem = "Nenhum registro encontrado!"
               this.lista = []
            }
            else {
               this.mensagem = "";
            }
         })
   }

}
