import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';

const routes: Routes = [
   // a rota pai será o LayoutComponent
   { path: 'clientes', component: LayoutComponent, canActivate: [AuthGuard],
      children: [
         { path: 'form', component: ClientesFormComponent },
         //rota para editar cliente passando o id
         { path: 'form/:id', component: ClientesFormComponent },
         { path: 'lista', component: ClientesListaComponent },
         // quando for acessada a raiz de /clientes vai ser redirecionado para clientes/lista
         { path: '', redirectTo: 'lista', pathMatch: 'full' }
      ]
   }

];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class ClientesRoutingModule { }
