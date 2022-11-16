import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideomeMainComponent } from './pages/videome-main/videome-main.component';
import { MaterialModule } from '@app/shared/modules/materialModule/material.module';
import { VideomeMobileRoutingModule } from './videome-mobile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PractiseInterviewComponent } from './pages/practise-interview/practise-interview';



@NgModule({
  declarations: [
    VideomeMainComponent,
    PractiseInterviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    VideomeMobileRoutingModule,
    ReactiveFormsModule
  ]
})
export class VideomeMobileModule { }
