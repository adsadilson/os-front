import { Observable } from 'rxjs';
import { Credenciais } from './../models/credenciais';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  urlBase: string = `${environment.baseURL}/login`;

  constructor(private http: HttpClient) { }


  authentication(creds: Credenciais){
    return this.http.post(this.urlBase, creds,{
      observe: 'response',
      responseType: 'text'
    });
  }

  successFulLogin(authToken: string){
    localStorage.setItem('token', authToken.substring(7))
  }

  isAuthentication(){
    let token = localStorage.getItem('token');
    if(null != token){
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

}
