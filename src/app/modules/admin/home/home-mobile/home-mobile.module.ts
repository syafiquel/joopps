import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeMobileRoutingModule } from './home-mobile-routing.module';
import { HomeMainComponent } from './pages/home-main/home-main.component';
import { MaterialModule } from 'src/app/shared/modules/materialModule/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SwiperModule } from 'swiper/angular';
import { NgChartsModule } from 'ng2-charts';
import { SharedModuleModule } from '@app/shared/modules/shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeMainComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    HomeMobileRoutingModule,
    SwiperModule,
    NgChartsModule,
    SharedModuleModule
  ]
})
export class HomeMobileModule { }
