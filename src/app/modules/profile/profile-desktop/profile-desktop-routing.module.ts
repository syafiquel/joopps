import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';

const routes: Routes = [
  {path: '', redirectTo: 'main-profile', pathMatch: 'full'},
  {
    path: 'main-profile',
    component: ProfileComponent
  },
  {
    path: 'about-me',
    component: AboutMeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileDesktopRoutingModule { }
