import { MatSort } from '@angular/material/sort'
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { Cliente } from 'src/app/models/cliente'
import { ClienteService } from 'src/app/services/cliente.service'
import { NotificationService } from 'src/app/shared/notification.service'
import { DialogExclusaoComponent } from '../../dialog/dialog-exclusao/dialog-exclusao.component'

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css'],
})
export class ClienteReadComponent implements AfterViewInit {
  clientes: Cliente[] = []
  filtro!: string

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'acoes']
  dataSource = new MatTableDataSource<Cliente>(this.clientes)

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private service: ClienteService,
    private router: Router,
    private notificationService: NotificationService,
    public dialog: MatDialog,
  ) {}

  ngAfterViewInit() {
    this.findAll()
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.clientes = resposta
      this.dataSource = new MatTableDataSource<Cliente>(this.clientes)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  navigateToCreate(): void {
    this.router.navigate(['clientes/create'])
  }

  deleteById(id: any): void {
    this.service.delete(id).subscribe(
      (resposta) => {
        this.findAll()
        this.notificationService.success(':: Cliente excluido com sucesso...')
      },
      (err) => {
        if (err.error.message != null) {
          this.notificationService.warn(err.error.message)
        } else {
          this.notificationService.warn(err.error.errors[0].message)
        }
      },
    )
  }

  openDialogExclusao(codigo: any, name: any): void {
    let dialogRef = this.dialog.open(DialogExclusaoComponent, {
      width: '450px',
      disableClose: true,
      position: { top: '7%' },
      data: {
        id: codigo,
        nome: name,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteById(codigo)
      }
    })
  }
}
