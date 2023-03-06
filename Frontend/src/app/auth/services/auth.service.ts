import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/login-form-value.model';
import { Users } from '../models/register-form-value.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router
  ) { }
  onRegister(name: string, email: string, password: string, role: string) {
    return this.http.post<Users>(`${environment.apiUrl}/user`,{name, email, password, role}).subscribe(
      (res: any) => {
        sessionStorage.setItem('token', res.token)
        this.router.navigateByUrl('/home')
      }
    )
  }
  onLogin(email: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/user/login`,{email, password}).subscribe(
      (res: any) => {
        sessionStorage.setItem('token', res.token)
        this.router.navigateByUrl('/home')
      }
    )
  }
  getToken():string{
    return sessionStorage.getItem('token')!
  }
}
