import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/login-form-value.model';
import { Users } from '../models/register-form-value.model';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../models/decodedToken.model';
import { BehaviorSubject, tap, Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
              private router: Router,
              private toastr: ToastrService
  ) { }

  decoded_token!: DecodedToken;

  private _loggedIn$ = new BehaviorSubject<boolean>(false);
  private _loading$ = new BehaviorSubject<boolean>(false);

  get isLoggedIn$():Observable<boolean> {
    return this._loggedIn$.asObservable();
  }

  setisLoggedInStatus(loggedIn:boolean){
    this._loggedIn$.next(loggedIn)
  }

  get isLoading$():Observable<boolean> {
    return this._loading$.asObservable();
  }

  setisLoadingStatus(loading:boolean){
    this._loading$.next(loading)
  }

  onRegister(name: string, email: string, password: string, role: string) {
    return this.http.post<Users>(`${environment.apiUrl}/user`,{name, email, password, role}).pipe(
      tap((res: any) => {
        sessionStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      }
    )).subscribe();
  }

  onLogin(email: string, password: string) {
    this.setisLoadingStatus(true)
    return this.http.post<User>(`${environment.apiUrl}/auth/login`,{email, password}).pipe(
      catchError((error: HttpErrorResponse) => {
        // Gérer l'erreur ici
        this.toastr.error( error.statusText, 'Oops!', {
          timeOut: 3000,
        });
        this.setisLoadingStatus(false);
        return throwError('Erreur lors de la connexion. Veuillez réessayer.');
      })
    ).subscribe(
      (res:any) => {
        if(res.token){
          this.toastr.success('Logged in successfully', 'Nice', {
            timeOut: 3000,
          });
          sessionStorage.setItem('token', res.token);
          this.setisLoadingStatus(false);
          this.router.navigate(['/home']);
        }
        else{
          this.setisLoadingStatus(false);
          this.toastr.error(res.err_message, 'Oops!', {
            timeOut: 3000,
          });
          console.log(res.err_message)
        }
      }
    );
  }

  getToken():string{
    return sessionStorage.getItem('token')!
  }

  decodeToken(): DecodedToken{
    const token = sessionStorage.getItem('token');
    if(token)
      this.decoded_token = jwt_decode(token);
      console.log(this.decoded_token)
      return this.decoded_token;
  }
}
