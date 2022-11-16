import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeDesktopRoutingModule } from './home-desktop-routing.module';
import { MainHomeComponent } from './pages/main-home/main-home.component';


@NgModule({
  declarations: [
    MainHomeComponent
  ],
  imports: [
    CommonModule,
    HomeDesktopRoutingModule
  ]
})
export class HomeDesktopModule { }
