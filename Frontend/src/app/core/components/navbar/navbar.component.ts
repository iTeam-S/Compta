import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable, tap } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  isLoggedIn$!: Observable<boolean>;
  constructor(private authService: AuthService){}

  ngOnInit(): void{
    this.initObservables()
  }

  private initObservables(){
    this.authService.isLoggedIn$.pipe(
      tap(value => console.log(value))
    ).subscribe()
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
}
