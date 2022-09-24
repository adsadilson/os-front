import { NotificationService } from './../../../../shared/notification.service';
import { DialogExclusaoComponent } from '../../dialog/dialog-exclusao/dialog-exclusao.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-read',
  templateUrl: './tecnico-read.component.html',
  styleUrls: ['./tecnico-read.component.css']
})
export class TecnicoReadComponent implements AfterViewInit {

  tecnicos: Tecnico[] =[];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone','acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.tecnicos);
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: TecnicoService,
    private router: Router,
    private notificationService: NotificationService,
    public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.findAll();
  }

  findAll():void{
    this.service.findAll().subscribe((resposta)=>{
      this.tecnicos = resposta;
      this.dataSource = new MatTableDataSource<Tecnico>(this.tecnicos);
      this.dataSource.paginator = this.paginator;
    })
  }
  
  navigateToCreate():void{
    this.router.navigate(['tecnicos/create'])
  }

  deleteById(id: any):void{
    this.service.delete(id).subscribe(resposta=>{
      this.findAll();
      this.notificationService.success('::Técnico excluido com sucesso...')
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

}
