import { ClienteService } from './../../../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {
  formulario!: FormGroup

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: ClienteService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
  ) {}
  

  ngOnInit(): void {
    this.findById(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  findById(id: any):void{
    this.service.findById(id).subscribe(resposta=>{
      this.formulario = this.formBuilder.group({
        id: resposta.id,
        nome: [resposta.nome, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]],
        cpf: [resposta.cpf, [Validators.required]],
        telefone: resposta.telefone
      })
    })
  }

  onSubmit(): void {
    this.service.update(this.formulario.value).subscribe(
      (resposta) => {
        this.router.navigate(['clientes'])
        this.notificationService.success(':: Cliente atualizado com sucesso.')
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

  voltar(): void {
    this.router.navigate(['clientes'])
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
