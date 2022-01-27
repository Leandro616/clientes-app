import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './login/usuario';

import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   apiURL: string = environment.apiURLBase + "/api/usuarios";
   apiTokenURL: string = environment.apiURLBase + environment.obterTokenURL;
   //  npm install --save @auth0/angular-jwt
   jwtHelper: JwtHelperService = new JwtHelperService();

   constructor(
      private http: HttpClient
   ) { }

   obterToken() {
      const tokenString = localStorage.getItem('access_token');
      if (tokenString) {
         const token = JSON.parse(tokenString).access_token;
         return token;
      }
      return null;
   }

   // este método irá dizer se o usuario está ou não autenticado
   isAuthenticated() : boolean {
      const token = this.obterToken();
      if (token) {
         // retorna true se o token está expirado
         const expired = this.jwtHelper.isTokenExpired(token);
         // se o expired for false, o token está válido
         return !expired;
      }

      return false;
   }

   salvar(usuario: Usuario): Observable<any> {
      return this.http.post<any>(this.apiURL, usuario);
   }

   tentarLogar(username: string, password: string) : Observable<any> {
      const params: string = new HttpParams()
         .set('username', username)
         .set('password', password )
         .set('grant_type', 'password')
         .toString();

      const headers = {
         // para codificar o clientId e ClienteSecret basta passa-los para o metodo
         // btoa("clienteId" + : + "clienteSecret"), este metodo já é nativo Js
         "Authorization": "Basic "
            + btoa(`${environment.clientId}:${environment.clientSecret}`),
         "Content-Type": "application/x-www-form-urlencoded"
      }

      // no ultimo parametro é passado um objeto com opções, o jeito comum seria
      // { headers: headers } mas como a propriedade tem o mesmo nome do objeto
      // pode abreviar
      return this.http.post(this.apiTokenURL, params, { headers });
   }

   encerrarSessao() {
      localStorage.removeItem('access_token');
   }

   getUsuarioAutenticado() {
      const token = this.obterToken();

      if (token) {
         const usuario = this.jwtHelper.decodeToken(token).user_name;
         return usuario;
      }
      return null;
   }
}
