import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessGuard } from './access.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', canActivate: [ AccessGuard ] },
  { path: 'design', loadChildren: './pages/design/design.module#DesignPageModule', canActivate: [ AccessGuard ] },
  { path: 'details', loadChildren: './pages/details/details.module#DetailsPageModule', canActivate: [ AccessGuard ] },
  { path: 'onboarding', loadChildren: './pages/onboarding/onboarding.module#OnboardingPageModule', canActivate: [ AccessGuard ] },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [ AccessGuard ] },
  { path: 'shopping-cart', loadChildren: './pages/shopping-cart/shopping-cart.module#ShoppingCartPageModule', canActivate: [ AccessGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
