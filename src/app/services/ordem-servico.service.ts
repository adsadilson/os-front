import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrdemServico } from '../models/ordemServico';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {

  urlBase: string = environment.baseURL+"/ordem-servicos";

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar) { }

  findAll():Observable<OrdemServico[]>{
    return this.http.get<OrdemServico[]>(this.urlBase);
  }

  findById(id: any):Observable<OrdemServico>{
    return this.http.get<OrdemServico>(`${this.urlBase}/${id}`);
  }

  delete(id: any):Observable<OrdemServico>{
    return this.http.delete<OrdemServico>(`${this.urlBase}/${id}`);
  }

  create(ordemservico: OrdemServico):Observable<OrdemServico>{
    return this.http.post<OrdemServico>(this.urlBase, ordemservico);
  }

  update(ordemservico: OrdemServico):Observable<OrdemServico>{
    return this.http.put<OrdemServico>(this.urlBase, ordemservico);
  }
   
}
