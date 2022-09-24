import { TecnicoService } from 'src/app/services/tecnico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {
  formulario!: FormGroup

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: TecnicoService,
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
        this.router.navigate(['tecnicos'])
        this.service.message('Registro atualizado com sucesso...')
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

  voltar(): void {
    this.router.navigate(['tecnicos'])
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
      return 'CPF é obrigatorio!'
    }
    return null
  }

}
