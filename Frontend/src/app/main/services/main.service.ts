import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, delay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }
  private _loading$ = new BehaviorSubject<boolean>(false);

  get loading$():Observable<boolean>{
    return this._loading$.asObservable();
  }

  private _users$ = new BehaviorSubject<UserModel[]>([]);

  get user$(): Observable<UserModel[]> {
    return this._users$.asObservable();
  }

  private setLoadingStatus(loading:boolean){
    this._loading$.next(loading)
  }

  getUsers(){
    this.setLoadingStatus(true);
    return this.http.get<UserModel[]>(`${environment.apiUrl}/user?search=Kevin`).pipe(
      delay(1000),
      tap(users => {
        this._users$.next(users);
        this.setLoadingStatus(false)
      })
    ).subscribe();
  }
}
