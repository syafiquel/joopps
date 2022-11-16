import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportMobileRoutingModule } from './report-mobile-routing.module';
import { ReportComponent } from './pages/report/report.component';
import { MaterialModule } from 'src/app/shared/modules/materialModule/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SwiperModule } from 'swiper/angular';
import { NgChartsModule } from 'ng2-charts';
import { SharedModuleModule } from '@app/shared/modules/shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    ReportMobileRoutingModule,
    SwiperModule,
    NgChartsModule,
    SharedModuleModule
  ]
})
export class ReportMobileModule { }
