import { AuthInterceptor, AuthInterceptorProvider } from './auth/auth.interceptor';
import { MaterialModule } from './shared/material/material.module';
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { MAT_DATE_LOCALE } from '@angular/material/core'
import { UpperCasePipe } from '@angular/common'
import { NgxMaskModule } from 'ngx-mask'


import { HeaderComponent } from './views/components/template/header/header.component';
import { FooterComponent } from './views/components/template/footer/footer.component';
import { NavComponent } from './views/components/template/nav/nav.component';
import { HomeComponent } from './views/components/home/home.component';
import { TecnicoReadComponent } from './views/components/tecnico/tecnico-read/tecnico-read.component';
import { TecnicoCreateComponent } from './views/components/tecnico/tecnico-create/tecnico-create.component'
import { CpfPipe } from './pipes/cpf.pipe';
import { TecnicoUpdateComponent } from './views/components/tecnico/tecnico-update/tecnico-update.component';
import { DialogExclusaoComponent } from './views/components/dialog/dialog-exclusao/dialog-exclusao.component';
import { ClienteReadComponent } from './views/components/cliente/cliente-read/cliente-read.component';
import { ClienteCreateComponent } from './views/components/cliente/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './views/components/cliente/cliente-update/cliente-update.component';
import { OrdemServicoReadComponent } from './views/components/os/ordem-servico-read/ordem-servico-read.component'
import { OrdemServicoDialogCreateComponent } from './views/components/os/ordem-servico-dialog-create/ordem-servico-dialog-create.component';
import { LoginComponent } from './views/components/template/login/login/login.component';
import { LoginAngularComponent } from './views/components/template/login/login-angular/login-angular.component';
import { ToastrModule } from 'ngx-toastr';
import { SidenavComponent } from './views/components/template/sidenav/sidenav/sidenav.component';
import { BodyComponent } from './views/components/template/body/body.component';
import { Home2Component } from './views/components/template/home2/home2.component';



@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, NavComponent, HomeComponent, TecnicoReadComponent, TecnicoCreateComponent, CpfPipe, 
    TecnicoUpdateComponent, DialogExclusaoComponent, ClienteReadComponent, ClienteCreateComponent, ClienteUpdateComponent, OrdemServicoReadComponent, OrdemServicoDialogCreateComponent, LoginComponent, LoginAngularComponent, SidenavComponent, BodyComponent, Home2Component],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false,
    }),
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    }),
    
    
  ],
  providers: [UpperCasePipe,{ provide: MAT_DATE_LOCALE, useValue: 'pt' }, AuthInterceptorProvider],

  
  bootstrap: [AppComponent],
})
export class AppModule {}
