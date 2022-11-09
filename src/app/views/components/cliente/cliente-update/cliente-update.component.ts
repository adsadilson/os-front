import { ToastrService } from 'ngx-toastr';
import { ClienteService } from './../../../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';
import { Cliente } from 'src/app/models/cliente';

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
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) {
    this.createForms(); 
  }

  createForms(){
    this.formulario = this.formBuilder.group({
      id: '',
      nome: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]],
      cpf: ['', [Validators.required]],
      telefone: '',
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(6)]],
    })
  }  

  ngOnInit(): void {
    this.findById(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  findById(id: any):void{
    this.service.findById(id).subscribe(resposta=>{
      this.populateFormCliente(resposta);
    })
  }
  
  private populateFormCliente(resposta: Cliente) {
    this.formulario.controls['nome'].setValue(resposta.nome);
    this.formulario.controls['cpf'].setValue(resposta.cpf);
    this.formulario.controls['id'].setValue(resposta.id);
    this.formulario.controls['telefone'].setValue(resposta.telefone);
    this.formulario.controls['email'].setValue(resposta.email);
    this.formulario.controls['senha'].setValue(resposta.senha);
  }

  onSubmit(): void {
    this.formulario.value.nome = this.formulario.value.nome.toUpperCase()
    this.formulario.value.email = this.formulario.value.email.toLowerCase()

    this.service.update(this.formulario.value).subscribe(
      (resposta) => {
        this.router.navigate(['clientes'])
        this.toastr.success('Cliente atualizado com sucesso.','Atualização de Cliente')
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

