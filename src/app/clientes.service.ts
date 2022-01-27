/* Serviço angular
  servico criado pelo comando:
  ng g s clientes

  Para que o serviço seja usado na injeção de dependencias
  é preciso declarar o serviço em app.modulo no atributo
  providers

  Para usar serviços http é preciso importar o HttpClientModule
  no app.module e importar o HttpClient no serviço

  Metodo Salvar() : Observable
  No metódo salvar() é retornado um Observable, ele serve para observar
  quanto a requisição for encerrada e nós fazermos alguma ação, sem ele
  a requisição vai ser feita e o programa vai continuar executando.
  No video ele usou o retorno Observable<Cliente> mas aqui deu erro


*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cliente } from './clientes/cliente';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
   providedIn: 'root'
})
export class ClientesService {

   apiURL: string = environment.apiURLBase + '/api/clientes';

   constructor(private http: HttpClient) {

   }

   salvar(cliente: Cliente): Observable<Cliente> {

      // estava dando erro sem o post<Cliente>
      return this.http.post<Cliente>(this.apiURL, cliente);
   }

   // na api o metodo atualizar não retorna nada
   atualizar(cliente: Cliente): Observable<any> {
      return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`,
         cliente)
   }

   getClientes(): Observable<Cliente[]> {
      /* Agora será feito no token.interceptor
      // testando autenticação com acess_token
      // localStorage.getItem() retorna string ou null
      const tokenString = localStorage.getItem('access_token');

      // solução para resolver problema de tokenString poder ser nulo
      const token = JSON.parse(tokenString || '{}');
      const headers ={
         'Authorization' : 'Bearer' + token.access_token
      } */

      return this.http.get<Cliente[]>(this.apiURL);
   }

   getClientePorId(id: number): Observable<Cliente> {
      return this.http.get<Cliente>(`${this.apiURL}/${id}`)
   }

   deletar(cliente: Cliente): Observable<any> {
      return this.http.delete<any>(`${this.apiURL}/${cliente.id}`)
   }

}
