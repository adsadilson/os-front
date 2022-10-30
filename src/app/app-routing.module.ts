import { AuthGuard } from './auth/auth.guard';
import { LoginAngularComponent } from './views/components/template/login/login-angular/login-angular.component';
import { NavComponent } from './views/components/template/nav/nav.component';
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
import { LoginComponent } from './views/components/template/login/login/login.component';

const routes: Routes = [
  { path: "login-2", component:LoginComponent},
  { path: "login", component:LoginAngularComponent},
  { path: "", component: NavComponent, canActivate: [AuthGuard], children:[
      { path: "home", component: HomeComponent},
      { path: "tecnicos", component: TecnicoReadComponent},
      { path: "tecnicos/create", component: TecnicoCreateComponent},
      { path: "tecnicos/update/:id", component: TecnicoUpdateComponent},
      { path: "clientes", component: ClienteReadComponent},
      { path: "clientes/create", component: ClienteCreateComponent},
      { path: "clientes/update/:id", component: ClienteUpdateComponent},
      { path: "ordem-servicos", component: OrdemServicoReadComponent}
    ] 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
