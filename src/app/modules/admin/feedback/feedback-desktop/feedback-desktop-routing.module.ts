import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackComponent } from './pages/feedback/feedback.component';

const routes: Routes = [
  {path: '', redirectTo: 'main-home', pathMatch: 'full'},
  {
    path: 'main-home',
    component: FeedbackComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackDesktopRoutingModule { }
