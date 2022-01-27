import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { TemplateModule } from './template/template.module';
import { ClientesModule } from './clientes/clientes.module';
import { ClientesService } from './clientes.service';
import { ServicosPrestadosModule } from './servicos-prestados/servicos-prestados.module';
import { ServicoPrestadoService } from './servico-prestado.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { AuthService } from './auth.service';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      LoginComponent,
      LayoutComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      AppRoutingModule,
      TemplateModule,
      ClientesModule,
      ServicosPrestadosModule
   ],
   providers: [
      ClientesService,
      ServicoPrestadoService,
      AuthService,
      // configuração do token.interceptor
      {
         provide: HTTP_INTERCEPTORS,
         useClass: TokenInterceptor,
         multi: true
      }
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
