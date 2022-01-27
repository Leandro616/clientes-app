import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { ServicosPrestadosFormComponent } from './servicos-prestados-form/servicos-prestados-form.component';
import { ServicosPrestadosListaComponent } from './servicos-prestados-lista/servicos-prestados-lista.component';

const routes: Routes = [
   { path: 'servicos-prestados', component: LayoutComponent,
      canActivate: [AuthGuard],
      children: [
         { path: 'form', component: ServicosPrestadosFormComponent },
         { path: 'lista', component: ServicosPrestadosListaComponent },
         { path: '', redirectTo: 'lista', pathMatch: 'full' }
      ]
   }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicosPrestadosRoutingModule { }
