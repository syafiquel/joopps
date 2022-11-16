import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { MaterialModule } from '../shared/modules/materialModule/material.module';
import { HomeHeaderComponent } from './layouts/home-header/home-header.component';
import { AdminHomeHeaderComponent } from './layouts/admin-home-header/admin-home-header.component';
import { MainComponent } from './main.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { HelpDialogOverviewComponent } from '@app/shared/components/help-dialog-overview/help-dialog-overview.component';
import { SwiperModule } from 'swiper/angular';
import { EmailConfirmComponent } from './pages/email-confirm/email-confirm.component';
import { RegisterComponent } from './pages/register/register.component';
import { CheckEmailComponent } from './pages/check-email/check-email.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';


@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    HomeHeaderComponent,
    AdminHomeHeaderComponent,
    ForgotComponent,
    HelpDialogOverviewComponent,
    EmailConfirmComponent,
    RegisterComponent,
    CheckEmailComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    MainRoutingModule,
    SwiperModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {
      provide: 'windowObject',
      useValue: window
    },
    {
      provide: 'location',
      useValue: location
    },
    {
      provide: 'localStorage',
      useValue: localStorage
    },
    {
      provide: 'sessionStorage',
      useValue: sessionStorage
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }
