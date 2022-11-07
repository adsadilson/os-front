import { ToastrService } from 'ngx-toastr';
import { ValidarCamposService } from './../../../../shared/validar-campos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {
  
  titulo = "Cadastrando cliente";

  formulario!: FormGroup

  constructor(
    public validarCampo: ValidarCamposService,
    private router: Router,
    private service: ClienteService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      cpf: [null, [Validators.required, Validators.minLength(11)]],
      telefone: [null],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(3)]],
    })
  }

  voltar(): void {
    this.router.navigate(['clientes'])
  }

  onSubmit(): void {
    this.formulario.value.nome = this.formulario.value.nome.toUpperCase()
    this.formulario.value.email = this.formulario.value.email.toLowerCase()

    this.service.create(this.formulario.value).subscribe(
      (resposta) => {
        this.router.navigate(['clientes'])
        this.toastr.success('Cliente salvo com sucesso.','Inclusão de Cliente')
      },
      (err) => {
        if (err.error.message.match('já cadastrado')) {
          this.toastr.warning(err.error.message)
        }else{
          this.toastr.warning(err.error.errors[0].message)
        }
      },
    )
  }

  resetar(): void {
    this.formulario.reset()
  }

  getErrorMessageNome() {
    if (this.formulario.get('nome')!.errors?.['required']) {
      return 'Nome é obrigatorio.'
    }

    if (this.formulario.get('nome')!.errors?.['minlength']) {
      return 'Nome deve ter no min 3 e no max 100 caracteres.'
    }

    return null
  }

  getErrorMessageCpf() {
    if (this.formulario.get('cpf')!.hasError('required')) {
      return 'CPF é obrigatorio.'
    }
    return null
  }

  getErrorMessageEmail() {
    if (this.formulario.get('email')!.hasError('required')) {
      return 'E-mail é obrigatorio.'
    }
      return null
  }

  getErrorMessageSenha() {
    if (this.formulario.get('senha')!.hasError('required')) {
      return 'Senha é obrigatorio.'
    }
    if (this.formulario.get('senha')!.errors?.['minlength']) {
      return 'Senha deve ter no min 6 caracteres e max 11.'
    }
      return null
  }
}
