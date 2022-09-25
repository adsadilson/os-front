import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlBase: string = `${environment.baseURL}/clientes`;

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar) { }

  findAll():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlBase);
  }

  findById(id: any):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlBase}/${id}`);
  }

  delete(id: any):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlBase}/${id}`);
  }

  create(cliente: Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlBase, cliente);
  }

  update(cliente: Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.urlBase, cliente);
  }
  
}
