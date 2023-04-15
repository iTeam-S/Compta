import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading$!: Observable<boolean>;
  users$!: Observable<UserModel[]>;

  constructor(private mainService: MainService){}
  ngOnInit(): void {
    this.initObservables();
    this.mainService.getUsers();
  }
  private initObservables(){
    this.loading$ = this.mainService.loading$;
    this.users$ = this.mainService.user$
  }
}
