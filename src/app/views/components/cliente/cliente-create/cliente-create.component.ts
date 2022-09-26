import { NotificationService } from './../../../../shared/notification.service';
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
    private router: Router,
    private service: ClienteService,
    private notificationService: NotificationService,
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
      cpf: [null, [Validators.required]],
      telefone: [null],
    })
  }

  voltar(): void {
    this.router.navigate(['clientes'])
  }

  onSubmit(): void {
    this.service.create(this.formulario.value).subscribe(
      (resposta) => {
        this.router.navigate(['clientes'])
        this.notificationService.success(':: Cliente salvo com sucesso.')
      },
      (err) => {
        if (err.error.message.match('já cadastrado')) {
          this.notificationService.warn(err.error.message)
        }else{
          this.notificationService.warn(err.error.errors[0].message)
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
}
