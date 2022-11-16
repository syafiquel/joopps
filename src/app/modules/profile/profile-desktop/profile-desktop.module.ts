import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './pages/profile/profile.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { MaterialModule } from 'src/app/shared/modules/materialModule/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileDesktopRoutingModule } from './profile-desktop-routing.module';


@NgModule({
  declarations: [
    ProfileComponent,
    AboutMeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ProfileDesktopRoutingModule
  ]
})
export class ProfileDesktopModule { }
