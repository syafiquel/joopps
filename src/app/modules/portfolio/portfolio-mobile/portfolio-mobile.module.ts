import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioMobileRouting } from './portfolio-mobile-routing.module';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { SwiperModule } from 'swiper/angular';
import { MaterialModule } from '@app/shared/modules/materialModule/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PortfolioComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PortfolioMobileRouting,
    SwiperModule,
    MaterialModule
  ],
  providers: [
  ]
})
export class PortfolioMobileModule { }
