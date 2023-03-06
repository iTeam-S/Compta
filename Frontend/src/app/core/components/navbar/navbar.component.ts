import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  showNavbar: boolean = false;  //stay as issue because need to relaod the current page
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.authService.getToken() ? this.showNavbar = true : this.showNavbar
  }
}
