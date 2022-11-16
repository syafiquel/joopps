import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentsComponent } from './assessments/assessments.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AssessmentsComponent
  },
];


@NgModule({
  declarations: [
    AssessmentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      routes,
    )
  ]
})
export class AssessmentsModule { }

