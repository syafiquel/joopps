import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeMobileRoutingModule } from './resume-mobile-routing.module';
import { ResumeComponent } from '../resume/resume.component';
import { SwiperModule } from 'swiper/angular';
import { MaterialModule } from '@app/shared/modules/materialModule/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [ResumeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ResumeMobileRoutingModule,
    SwiperModule,
    MaterialModule,
    PdfViewerModule
  ],
  providers: [
  ]
})
export class ResumeMobileModule { }
