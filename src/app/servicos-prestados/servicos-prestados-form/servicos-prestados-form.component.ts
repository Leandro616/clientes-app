import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestado } from '../ServicoPrestado';

@Component({
   selector: 'app-servicos-prestados-form',
   templateUrl: './servicos-prestados-form.component.html',
   styleUrls: ['./servicos-prestados-form.component.css']
})
export class ServicosPrestadosFormComponent implements OnInit {

   clientes: Cliente[] = [];
   servicoPrestado: ServicoPrestado;
   sucesso: boolean = false;
	erros: String[];

   constructor(
      private clienteService: ClientesService,
      private service: ServicoPrestadoService
   ) {
      this.servicoPrestado = new ServicoPrestado();
   }

   ngOnInit(): void {
      this.clienteService
         .getClientes()
         .subscribe(
            response => this.clientes = response
         )
   }

   onSubmit() {
      this.service
         .salvar(this.servicoPrestado)
         .subscribe(
            response => {
               this.sucesso = true;
               this.erros = [];
               this.servicoPrestado = new ServicoPrestado();
            },
            errorResponse => {
               this.sucesso = false;
               this.erros = errorResponse.error.errors;
            }
         )
   }

}
