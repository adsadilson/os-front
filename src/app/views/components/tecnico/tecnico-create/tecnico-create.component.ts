import { UpperCasePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Tecnico } from 'src/app/models/tecnico'
import { TecnicoService } from 'src/app/services/tecnico.service'

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css'],
})
export class TecnicoCreateComponent implements OnInit {
  formulario!: FormGroup

  constructor(
    private router: Router,
    private upperCasePipe: UpperCasePipe,
    private service: TecnicoService,
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
    this.router.navigate(['tecnicos'])
  }

  onSubmit(): void {
    this.formulario.value.nome = this.upperCasePipe.transform(this.formulario.value.nome)
    this.service.create(this.formulario.value).subscribe(
      (resposta) => {
        this.router.navigate(['tecnicos'])
        this.service.message(':: Técnico salvo com sucesso.')
      },
      (err) => {
        if (err.error.message.match('já cadastrado')) {
          this.service.message(err.error.message)
        }else{
          this.service.message(err.error.errors[0].message)
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
