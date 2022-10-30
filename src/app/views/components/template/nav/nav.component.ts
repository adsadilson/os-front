import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
      private router: Router, 
      private authService: AuthService,
      private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login'])
    this.toastr.info('Logout realizado com sucesso.','Logout', {timeOut: 7000})
  }

}
