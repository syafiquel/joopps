import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportDesktopRoutingModule } from './report-desktop-routing.module';
import { ReportComponent } from './pages/report/report.component';


@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    ReportDesktopRoutingModule
  ]
})
export class ReportDesktopModule { }
