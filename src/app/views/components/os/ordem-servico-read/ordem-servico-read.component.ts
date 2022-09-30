import { MatSort } from '@angular/material/sort';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrdemServico } from 'src/app/models/ordemServico';
import { OrdemServicoService } from 'src/app/services/ordem-servico.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogExclusaoComponent } from '../../dialog/dialog-exclusao/dialog-exclusao.component';

@Component({
  selector: 'app-ordem-servico-read',
  templateUrl: './ordem-servico-read.component.html',
  styleUrls: ['./ordem-servico-read.component.css']
})
export class OrdemServicoReadComponent implements AfterViewInit {

  ordemservicos: OrdemServico[] =[];

  displayedColumns: string[] = ['tecnico', 'cliente', 'abertura', 'fechamento','prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<OrdemServico>(this.ordemservicos);
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private service: OrdemServicoService,
    private router: Router,
    private notificationService: NotificationService,
    public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.findAll();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  findAll():void{
    this.service.findAll().subscribe((resposta)=>{
      this.ordemservicos = resposta;
      this.dataSource = new MatTableDataSource<OrdemServico>(this.ordemservicos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
  }
  
  navigateToCreate():void{
    this.router.navigate(['ordem-servicos/create'])
  }

  deleteById(id: any):void{
    this.service.delete(id).subscribe(resposta=>{
      this.findAll();
      this.notificationService.success('Ordem de Servico excluido com sucesso...')
    },
    (err) => {
      if (err.error.message != null) {
        this.notificationService.warn(err.error.message)
      }else{
        this.notificationService.warn(err.error.errors[0].message)
      }
    },)
  }

  openDialogExclusao(codigo: any, name: any): void {
    let dialogRef = this.dialog.open(DialogExclusaoComponent, {
      width: '450px',
      disableClose: true,
      position: {top: "7%"},
      data: {
        id: codigo,
        nome: name,
      },
    });
    
    dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.deleteById(codigo);
        }
    });
  }

  prioridade(tipo: any){
    if(tipo =="BAIXO"){
      return "baixo"
    }else if(tipo =="MÉDIA"){
      return "media"
    }else{
      return "alta"
    }
  }

}

