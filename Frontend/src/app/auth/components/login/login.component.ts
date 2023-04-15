import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  loading$!: Observable<boolean>;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.loading$ = this.authService.isLoading$
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  })

  disabled():boolean{
    if(this.loginForm.invalid){
      return true
    }
    return false
  }

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    this.authService.onLogin(this.loginForm.value.email, this.loginForm.value.password)
  }
  register(){
    this.router.navigateByUrl('auth/register')
  }

}
