import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../../../services/auth.service';
import { Router } from '@angular/router';
import { navBarData } from './../nav-data';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle>= new EventEmitter();

  collapsed = false;
  screenWidth = 0;
  navData = navBarData;

  constructor(private router: Router, 
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(){
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login'])
    this.toastr.info('Logout realizado com sucesso.','Logout', {timeOut: 7000})
  }

}
