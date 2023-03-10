import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MainService } from './services/main.service';
import { SharedModule } from '../shared/shared.module';
import { AdminPageComponent } from './components/admin-page/admin-page.component';


@NgModule({
  declarations: [
    HomeComponent,
    AdminPageComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  providers: [
    MainService
  ]
})
export class MainModule { }
