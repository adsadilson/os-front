import { Home2Component } from './views/components/template/home2/home2.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginAngularComponent } from './views/components/template/login/login-angular/login-angular.component';
import { ClienteUpdateComponent } from './views/components/cliente/cliente-update/cliente-update.component';
import { ClienteCreateComponent } from './views/components/cliente/cliente-create/cliente-create.component';
import { TecnicoUpdateComponent } from './views/components/tecnico/tecnico-update/tecnico-update.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/components/home/home.component';
import { TecnicoCreateComponent } from './views/components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoReadComponent } from './views/components/tecnico/tecnico-read/tecnico-read.component';
import { ClienteReadComponent } from './views/components/cliente/cliente-read/cliente-read.component';
import { OrdemServicoReadComponent } from './views/components/os/ordem-servico-read/ordem-servico-read.component';


const routes: Routes = [
  { path: "login", component:LoginAngularComponent},
  
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard], children:[
      { path: "home", component: Home2Component},
      { path: "tecnicos", component: TecnicoReadComponent},
      { path: "tecnicos/create", component: TecnicoCreateComponent},
      { path: "tecnicos/update/:id", component: TecnicoUpdateComponent},
      { path: "clientes", component: ClienteReadComponent},
      { path: "clientes/create", component: ClienteCreateComponent},
      { path: "clientes/update/:id", component: ClienteUpdateComponent},
      { path: "ordem-servicos", component: OrdemServicoReadComponent}
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
