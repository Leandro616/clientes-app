import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';

// quando for acessada a url raiz-sistema/home será direcionada para esse component
const routes: Routes = [
   { path: 'login', component: LoginComponent },
   // a rota 'home' será filha da rota de LayoutComponent
   // quando for acessada a rota 'home' ela estará dentro do layoutComponent
   { path: '', component: LayoutComponent,
      children: [
         // nas rotas eu definos os guards
         { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
         { path: '', redirectTo: '/home', pathMatch: 'full' }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
