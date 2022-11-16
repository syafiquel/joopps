import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './pages/report/report.component';

const routes: Routes = [
  {path: '', redirectTo: 'main-home', pathMatch: 'full'},
  {
    path: 'main-home',
    component: ReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportDesktopRoutingModule { }
