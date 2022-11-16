import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackMobileRoutingModule } from './feedback-mobile-routing.module';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { MaterialModule } from 'src/app/shared/modules/materialModule/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SwiperModule } from 'swiper/angular';
import { NgChartsModule } from 'ng2-charts';
import { SharedModuleModule } from '@app/shared/modules/shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FeedbackComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    FeedbackMobileRoutingModule,
    SwiperModule,
    NgChartsModule,
    SharedModuleModule
  ]
})
export class FeedbackMobileModule { }
