import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  urlBase: String = environment.baseURL;

  constructor(private http: HttpClient) { }

  findAll():Observable<Tecnico[]>{
    return this.http.get<Tecnico[]>(this.urlBase+"/tecnicos");
  }
  
}
