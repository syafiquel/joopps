import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PractiseInterviewComponent } from './pages/practise-interview/practise-interview';

const routes: Routes = [
  {
    path: '',
    component: PractiseInterviewComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticeMobileRoutingModule { }
