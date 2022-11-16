import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExternalProfileComponent } from './pages/external-profile/external-profile.component';
import { MaterialModule } from 'src/app/shared/modules/materialModule/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ExternalProfileDesktopRoutingModule } from './external-profile-desktop-routing.module';


@NgModule({
  declarations: [
    ExternalProfileComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ExternalProfileDesktopRoutingModule
  ]
})
export class ExternalProfileDesktopModule { }
