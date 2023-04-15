import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  hide: boolean = true;
  role: string = '';
  foods: Food[] = [
    {value: '', viewValue: '--'},
    {value: 'admin', viewValue: 'Admin'},
    {value: 'user', viewValue: 'User'},
  ];
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {

  }

  loginForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    role: ['', [Validators.required, Validators.minLength(3)]]
  })


  onRegister() {
    if (!this.loginForm.valid && this.role === '') {
      return;
    }
    this.authService.onRegister(
      this.loginForm.value.name,
      this.loginForm.value.email,
      this.loginForm.value.password,
      this.role
    )
  }
  login(){
    this.router.navigateByUrl('auth/login')
  }
}
