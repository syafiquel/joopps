import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/shared/modules/materialModule/material.module';
import { PracticeMobileRoutingModule } from './practice-mobile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PractiseInterviewComponent } from './pages/practise-interview/practise-interview';



@NgModule({
  declarations: [
    PractiseInterviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PracticeMobileRoutingModule,
    ReactiveFormsModule
  ]
})
export class PracticeMobileModule { }
