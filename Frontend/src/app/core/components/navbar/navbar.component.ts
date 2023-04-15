import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable, tap } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  isLogged = false;
  isLogg$! : Observable<boolean>;
  constructor(private authService: AuthService){}

  ngOnInit(): void{
    this.initObservables()
  }

  private initObservables(){
    this.isLogg$ = this.authService.isLoggedIn$
  }
}
