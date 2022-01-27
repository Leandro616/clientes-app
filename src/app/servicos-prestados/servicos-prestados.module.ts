import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicosPrestadosRoutingModule } from './servicos-prestados-routing.module';
import { ServicosPrestadosFormComponent } from './servicos-prestados-form/servicos-prestados-form.component';
import { ServicosPrestadosListaComponent } from './servicos-prestados-lista/servicos-prestados-lista.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
   declarations: [
      ServicosPrestadosFormComponent,
      ServicosPrestadosListaComponent
   ],
   imports: [
      CommonModule,
      ServicosPrestadosRoutingModule,
      FormsModule,
      RouterModule
   ],
   exports: [
      ServicosPrestadosFormComponent,
      ServicosPrestadosListaComponent
   ]
})
export class ServicosPrestadosModule { }
