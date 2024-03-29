import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { httpInterceptorProviders } from './interceptor';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    httpInterceptorProviders,
    AuthService
  ],
  exports:[
    NavbarComponent
  ]
})
export class CoreModule { }
