/* O metodo subscribe de Observable tem dois callbaks
	 o primeiro é de sucesso e o segundo é de erro


*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';

@Component({
	selector: 'app-clientes-form',
	templateUrl: './clientes-form.component.html',
	styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

	cliente: Cliente;
	sucesso: boolean = false;
	erros: String[];
   id: number;

	// a injeção de dependencia do angular injeta um ClientesService
	constructor(
         private service: ClientesService,
         private router: Router,
         private activatedRoute : ActivatedRoute) {
		this.cliente = new Cliente();
	}

	ngOnInit(): void {
      let parametros = this.activatedRoute.params
      parametros
         .subscribe(parametro => {
            this.id = parametro.id;
         });

      if (this.id) {
         this.service.getClientePorId(this.id)
            .subscribe(parametro => this.cliente = parametro)
      }
	}

	onSubmit() {

      // se tiver id ele atualiza
      if (this.id) {

         this.service
            .atualizar(this.cliente)
            .subscribe(response => {
               this.sucesso = true;
               this.erros = [];
            },errorResponse => {
               this.erros = ['Erro ao atualizar cliente']
            })

      }
      else { // se não ele salva

         this.service
            .salvar(this.cliente)
            .subscribe(response => {
               this.sucesso = true;
               this.erros = [];
               this.cliente = response;
            }, errorResponse => {
               this.sucesso = false;
               this.erros = errorResponse.error.errors;
            });
      }

	}

   voltarParaListagem() {
      this.router.navigate(['clientes/lista']);
   }

}
