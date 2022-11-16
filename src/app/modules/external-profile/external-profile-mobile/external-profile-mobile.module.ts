import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExternalProfileMobileRoutingModule } from './external-profile-mobile-routing.module';
import { ExternalProfileComponent } from './pages/external-profile/external-profile.component';
import { MaterialModule } from 'src/app/shared/modules/materialModule/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    ExternalProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    ExternalProfileMobileRoutingModule,
    SwiperModule
  ]
})
export class ExternalProfileMobileModule { }
