import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { MainService } from '../../services/main.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading$!: Observable<boolean>;
  users$!: Observable<UserModel[]>;

  constructor(private mainService: MainService, private auth: AuthService, private router: Router){}
  ngOnInit(): void {
    this.initObservables();
    this.mainService.getUsers();
    this.auth.decodeToken()
  }
  private initObservables(){
    this.loading$ = this.mainService.loading$;
    this.users$ = this.mainService.user$
  }
  logout(){
    sessionStorage.removeItem('token')
    this.auth.setisLoggedInStatus(false)
    this.router.navigate(['auth/login']);
  }
}
