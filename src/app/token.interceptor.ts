import { Injectable } from '@angular/core';
import {
   HttpRequest,
   HttpHandler,
   HttpEvent,
   HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

/*
   essa classe irá interceptar todas as requisições e adicionar
   o access_token em cada requisição

*/
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

   constructor() { }

   intercept(request: HttpRequest<unknown>, next: HttpHandler)
         : Observable<HttpEvent<unknown>> {

      const tokenString = localStorage.getItem('access_token');
      const url = request.url;

      /* Quando o usuario for fazer login não é para ele colocar o token bearer
         porque para fazer login é utilizado outro token que já está configurado
         em AuthService.tentarLogar

         Por isso está configurado para interceptar somente se não for no login
         ou no cadastro de usuario
      */
      if (tokenString && !url.endsWith('/oauth/token')
            && !url.endsWith('/api/usuarios')) {

         const token = JSON.parse(tokenString);
         const jwt = token.access_token;

         request = request.clone({
            setHeaders : {
               Authorization: 'Bearer ' + jwt
            }
         })
      }

      return next.handle(request);
   }
}
