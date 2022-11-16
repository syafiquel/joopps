import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/modules/materialModule/material.module';
import { HomeHeaderComponent } from './layouts/home-header/home-header.component';
import { AdminHomeHeaderComponent } from './layouts/admin-home-header/admin-home-header.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { AuthGuard } from './_helpers/auth.guard';
import { EmailConfirmComponent } from './pages/email-confirm/email-confirm.component';
import { CheckEmailComponent } from './pages/check-email/check-email.component';
import { RegisterComponent } from './pages/register/register.component';
import {AdminAuthGuard} from '@app/main/_helpers/admin-auth.guard';

const isDesktop = (): boolean => {
  return navigator['orientation'] === undefined;
}
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const routes: Routes = [
  {
    path: 'signout',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeHeaderComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => {
          if (!isMobile) {
            return import('../modules/home/home-desktop/home-desktop.module').then((m) => m.HomeDesktopModule);
          }
          return import('../modules/home/home-mobile/home-mobile.module').then((m) => m.HomeMobileModule);
        }
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => {
          if (!isMobile) {
            return import('../modules/profile/profile-desktop/profile-desktop.module').then((m) => m.ProfileDesktopModule);
          }
          return import('../modules/profile/profile-mobile/profile-mobile.module').then((m) => m.ProfileMobileModule);
        }
      },
      {
        path: 'external-profile',
        canActivate: [AuthGuard],
        loadChildren: () => {
          if (!isMobile) {
            return import('../modules/external-profile/external-profile-desktop/external-profile-desktop.module')
              .then((m) => m.ExternalProfileDesktopModule);
          }
          return import('../modules/external-profile/external-profile-mobile/external-profile-mobile.module')
            .then((m) => m.ExternalProfileMobileModule);
        }
      },
      {
        path: 'assessments',
        canActivate: [AuthGuard],
        loadChildren: () => {
          return import('../modules/assesments/assessments.module').then((m) => m.AssessmentsModule);
        }
      },
      {
        path: 'portfolio',
        canActivate: [AuthGuard],
        loadChildren: () => {
          if (!isMobile) {
            return null;
          }
          return import('../modules/portfolio/portfolio-mobile/portfolio-mobile.module').then((m) => m.PortfolioMobileModule);
        }
      },
      {
        path: 'videome',
        canActivate: [AuthGuard],
        loadChildren: () => {
          if (!isMobile) {
            return null;
          }
          return import('../modules/videome/videome-mobile/videome-mobile.module').then((m) => m.VideomeMobileModule);
        }
      },
      {
        path: 'practice-interview',
        canActivate: [AuthGuard],
        loadChildren: () => {
          if (!isMobile) {
            return null;
          }
          return import('../modules/practice-interview/practice-interview-mobile/practice-mobile.module').then((m) => m.PracticeMobileModule);
        }
      },
      {
        path: 'resume',
        canActivate: [AuthGuard],
        loadChildren: () => {
          if (!isMobile) {
            return null;
          }
          return import('../modules/resume/resume-mobile/resume-mobile.module').then((m) => m.ResumeMobileModule);
        }
      },
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forgot',
        component: ForgotComponent
      },
      {
        path: 'checkEmail',
        component: CheckEmailComponent
      },
      {
        path: 'emailConfirm',
        component: EmailConfirmComponent
      },
      {
        path: 'signUp',
        component: RegisterComponent
      },
      {
        path: 'signin',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        redirectTo: '/admin/home',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forgot',
        component: ForgotComponent
      },
      {
        path: 'checkEmail',
        component: CheckEmailComponent
      },
      {
        path: 'emailConfirm',
        component: EmailConfirmComponent
      },
      {
        path: 'signUp',
        component: RegisterComponent
      },
      {
        path: 'signin',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'admin',
    component: AdminHomeHeaderComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        canActivate: [AdminAuthGuard],
        loadChildren: () => {
          if (!isMobile) {
            return import('../modules/admin/home/home-desktop/home-desktop.module').then((m) => m.HomeDesktopModule);
          }
          return import('../modules/admin/home/home-mobile/home-mobile.module').then((m) => m.HomeMobileModule);
        }
      },
      {
        path: 'report',
        canActivate: [AdminAuthGuard],
        loadChildren: () => {
          if (!isMobile) {
            return import('../modules/admin/report/report-desktop/report-desktop.module').then((m) => m.ReportDesktopModule);
          }
          return import('../modules/admin/report/report-mobile/report-mobile.module').then((m) => m.ReportMobileModule);
        }
      },
      {
        path: 'feedback',
        canActivate: [AdminAuthGuard],
        loadChildren: () => {
          if (!isMobile) {
            return import('../modules/admin/feedback/feedback-desktop/feedback-desktop.module').then((m) => m.FeedbackDesktopModule);
          }
          return import('../modules/admin/feedback/feedback-mobile/feedback-mobile.module').then((m) => m.FeedbackMobileModule);
        }
      },
    ]
  }
];

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
