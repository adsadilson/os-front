import { Prioridade } from '../../../../enums/prioridade';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from './../../../../services/cliente.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { OrdemServicoService } from './../../../../services/ordem-servico.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogData } from './../../dialog/dialog-exclusao/dialog-exclusao.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-ordem-servico-dialog-create',
  templateUrl: './ordem-servico-dialog-create.component.html',
  styleUrls: ['./ordem-servico-dialog-create.component.css']
})
export class OrdemServicoDialogCreateComponent implements OnInit {

  public formulario!: FormGroup;

  prioridades: Prioridade[] = [
    {descricao: 'BAIXA'},
    {descricao: 'MÉDIA'},
    {descricao: 'ALTA'},
  ];

  clientes: Cliente[]=[];
  

  filterClientes!: Cliente[];

  constructor(
    private service: OrdemServicoService,
    private clienteService: ClienteService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<OrdemServicoDialogCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,){ }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      dataAbertura: ['',Validators.required],
      prioridade: ['', Validators.required],
      observacoes: [''],
     // tecnico: ['', Validators.required],
      cliente: ['', Validators.required],
    })
    
    this.getClientes();

    this.formulario.get('cliente')?.valueChanges.subscribe(resposta=>{
      this.filterData(resposta);
    })
    
  }

  onCancel(): void {
    this.dialogRef.close();
    
  }

  createOrdemServico(): void {
    let newDate: moment.Moment = moment.utc(this.formulario.value.dataAbertura).local();
    this.formulario.value.dataAbertura = newDate.format("YYYY-MM-DD");

    this.service.create(this.formulario.value).subscribe(
      (resposta) => {
        this.service.create(resposta);
        this.notificationService.success('Ordem de serviço cadastrado com sucesso.')
      },
      (err) => {
        if (err.error.message === null) {
          this.notificationService.warn(err.error.message)
        }else{
          this.notificationService.warn(err.error.errors[0].message)
        }
      },
    )
  }

  private filterData(value: string){
    this.filterClientes = this.clientes.filter(item => {
      return item.nome.toLowerCase().indexOf(value) > -1
    });
  }

  getClientes():void{
    this.clienteService.findAll().subscribe((resposta)=>{
      this.clientes = resposta;
      this.filterClientes = resposta;
    });
  }

  resetar(): void {
    this.formulario.reset()
  }

  
}
