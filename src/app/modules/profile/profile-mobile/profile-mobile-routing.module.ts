import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'main-profile',
  },
  {
    path: 'about-me',
    component: AboutMeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileMobileRoutingModule { }
