import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/login-form-value.model';
import { Users } from '../models/register-form-value.model';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../models/decodedToken.model';
import { BehaviorSubject, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
              private router: Router
  ) { }

  decoded_token!: DecodedToken;
  private _loggedIn$ = new BehaviorSubject<boolean>(false);

  get isLoggedIn$():Observable<boolean> {
    return this._loggedIn$.asObservable();
  }

  private setisLoggedInStatus(loggedIn:boolean){
    this._loggedIn$.next(loggedIn)
  }

  onRegister(name: string, email: string, password: string, role: string) {
    return this.http.post<Users>(`${environment.apiUrl}/user`,{name, email, password, role}).pipe(
      tap((res: any) => {
        this.setisLoggedInStatus(true);
        sessionStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      }
    )).subscribe();
  }

  onLogin(email: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/user/login`,{email, password}).pipe(
      tap((res:any) => {
        this.setisLoggedInStatus(true);
        sessionStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      })
    ).subscribe();
  }

  getToken():string{
    return sessionStorage.getItem('token')!
  }

  decodeToken(): DecodedToken{
    const token = sessionStorage.getItem('token');
    if(token)
      this.decoded_token = jwt_decode(token);
      return this.decoded_token;
  }
}
