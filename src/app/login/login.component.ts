import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent {

   username: string;
   password: string;
   cadastrando: boolean;
   mensagemSucesso: string;
   erros: string[];

   constructor(
      private router: Router,
      private authService: AuthService
   ) { }

   onSubmit() {
      this.authService
         .tentarLogar(this.username, this.password)
         .subscribe(response => {
            const access_token = JSON.stringify(response);
            /* Vamos armazenar o objeto que contem o access_token em localStorage
               em forma de string.
               A diferença entre localStorage e sessionStorage é que a session apaga os
               objetos quando a aba do site é fechada no navegador.
            */
            localStorage.setItem('access_token', access_token);

            this.router.navigate(['/home']);
         }, errorResponse => {
            this.erros = ['Usuario e/ou senha incorreto(s).']
         })

   }

   preparaCadastrar(event: Event) {
      event.preventDefault();
      this.cadastrando = true;
      this.resetForm();
   }

   cancelaCadastro() {
      this.cadastrando = false;
      this.resetForm();
   }

   cadastrar() {
      let usuario: Usuario = new Usuario();
      usuario.username = this.username;
      usuario.password = this.password;

      this.authService.salvar(usuario)
         .subscribe(response => {
            this.mensagemSucesso =
               "Cadastro realizado com sucesso! Efetue o login.";
            this.cadastrando = false;
            this.resetForm();
         },
         errorResponse => {
            this.mensagemSucesso = "";
            this.erros = errorResponse.error.errors;
         });
   }

   resetForm() {
      this.username = '';
      this.password = '';
      this.erros = [];
   }
}
