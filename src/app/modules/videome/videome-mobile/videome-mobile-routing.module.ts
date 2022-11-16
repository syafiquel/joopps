import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PractiseInterviewComponent } from './pages/practise-interview/practise-interview';
import { VideomeMainComponent } from './pages/videome-main/videome-main.component';

const routes: Routes = [
  {
    path: '',
    component: VideomeMainComponent
  },
  {
    path: 'practise',
    component: PractiseInterviewComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideomeMobileRoutingModule { }
