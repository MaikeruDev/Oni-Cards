import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard'

const redirectUnauthorizedToLogin = () => 
  redirectUnauthorizedTo(['/login']);

const redirectLoggedInToHome = () =>
  redirectLoggedInTo(['/drops']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'drops',
    pathMatch: 'full'
  },
  {
    path: 'drops',
    loadChildren: () => import('./pages/drops/drops.module').then( m => m.DropsPageModule),
    title: "Oni · Drops",
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'collection',
    loadChildren: () => import('./pages/collection/collection.module').then( m => m.CollectionPageModule),
    title: "Oni · Collection",
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'social',
    loadChildren: () => import('./pages/social/social.module').then( m => m.SocialPageModule),
    title: "Oni · Social",
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'combat',
    loadChildren: () => import('./pages/combat/combat.module').then( m => m.CombatPageModule),
    title: "Oni · Combat",
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'other',
    loadChildren: () => import('./pages/other/other.module').then( m => m.OtherPageModule),
    title: "Oni · Other",
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    title: "Oni · Login",
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    title: "Oni · Register",
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule),
    title: "Oni · Forgot Password",
    ...canActivate(redirectLoggedInToHome)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
