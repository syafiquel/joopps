import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileMobileRoutingModule } from './profile-mobile-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { MaterialModule } from 'src/app/shared/modules/materialModule/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    ProfileComponent,
    AboutMeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    ProfileMobileRoutingModule,
    SwiperModule
  ]
})
export class ProfileMobileModule { }
