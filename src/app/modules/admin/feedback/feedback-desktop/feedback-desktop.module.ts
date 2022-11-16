import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackDesktopRoutingModule } from './feedback-desktop-routing.module';
import { FeedbackComponent } from './pages/feedback/feedback.component';


@NgModule({
  declarations: [
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    FeedbackDesktopRoutingModule
  ]
})
export class FeedbackDesktopModule { }
