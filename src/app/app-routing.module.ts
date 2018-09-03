import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'design', loadChildren: './pages/design/design.module#DesignPageModule' },
  { path: 'details', loadChildren: './pages/details/details.module#DetailsPageModule' },
  { path: 'onboarding', loadChildren: './pages/onboarding/onboarding.module#OnboardingPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'shopping-cart', loadChildren: './pages/shopping-cart/shopping-cart.module#ShoppingCartPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
