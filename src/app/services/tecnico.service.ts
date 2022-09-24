import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  urlBase: string = environment.baseURL+"/tecnicos";

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar) { }

  findAll():Observable<Tecnico[]>{
    return this.http.get<Tecnico[]>(this.urlBase);
  }

  findById(id: any):Observable<Tecnico>{
    return this.http.get<Tecnico>(`${this.urlBase}/${id}`);
  }

  create(tecnico: Tecnico):Observable<Tecnico>{
    return this.http.post<Tecnico>(this.urlBase, tecnico);
  }

  update(tecnico: Tecnico):Observable<Tecnico>{
    return this.http.put<Tecnico>(this.urlBase, tecnico);
  }
  
  message(msg: String):void{
    this.snack.open(`${msg}`, 'OK',{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000,
    })
  }
  
}
