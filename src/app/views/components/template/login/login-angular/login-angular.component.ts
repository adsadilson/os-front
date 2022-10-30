import { AuthService } from './../../../../../services/auth.service';
import { TecnicoService } from './../../../../../services/tecnico.service';
import { Router } from '@angular/router';
import { LowerCasePipe, UpperCasePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-angular',
  templateUrl: './login-angular.component.html',
  styleUrls: ['./login-angular.component.css']
})
export class LoginAngularComponent implements OnInit {

  formulario!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: [null, Validators.required],
      senha: [null, [ Validators.required, Validators.minLength(3)]],
    })
  }


  onSubmit(): void {
    this.formulario.value.email = this.formulario.value.email
    this.service.authentication(this.formulario.value).subscribe(resposta =>{
    this.service.successFulLogin(resposta.headers.get('Authorization')!);
    this.router.navigate(['/home']);
    }, () => {
      this.toastr.error('Usuário e/ou senha inválidos!')
    })
    
  } 

  getErrorMessageEmail() {
    if (this.formulario.get('email')!.errors?.['required']) {
      return 'E-mail é obrigatorio.'
    }
      return null
  }

  getErrorMessageSenha() {
    if (this.formulario.get('senha')!.errors?.['required']) {
      return 'Senha é obrigatorio.'
    }
    if (this.formulario.get('senha')!.errors?.['minlength']) {
      return 'Senha deve ter no min 3 caracteres.'
    }
      return null
  }

}
