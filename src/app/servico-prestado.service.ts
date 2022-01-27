import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ServicoPrestado } from './servicos-prestados/ServicoPrestado';
import { ServicoPrestadoBusca } from './servicos-prestados/servicos-prestados-lista/servicoPrestadoBusca';

@Injectable({
   providedIn: 'root'
})
export class ServicoPrestadoService {

   apiURL: string = environment.apiURLBase + '/api/servicos-prestados'

   constructor(private http: HttpClient) { }

   salvar(servicoPrestado: ServicoPrestado) : Observable<ServicoPrestado> {
      return this.http.post<ServicoPrestado>(this.apiURL, servicoPrestado);
   }

   buscar(nome: string, mes: number) : Observable<ServicoPrestadoBusca[]> {

      if (!nome) {
         nome = ""
      }

      let params;

      if (mes) {
         params = new HttpParams()
            .set("nome", nome)
            .set("mes", mes);
      }
      else {
         params = new HttpParams()
            .set("nome", nome);
      }

      let url = this.apiURL + "?" + params.toString();

      return this.http.get<any>(url);
   }
}
