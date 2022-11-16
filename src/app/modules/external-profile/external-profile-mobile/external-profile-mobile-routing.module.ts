import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalProfileComponent } from './pages/external-profile/external-profile.component';

const routes: Routes = [
  {
    path: ':id',
    component: ExternalProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalProfileMobileRoutingModule { }
