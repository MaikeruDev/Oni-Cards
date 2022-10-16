import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'drops',
    pathMatch: 'full'
  },
  {
    path: 'drops',
    loadChildren: () => import('./pages/drops/drops.module').then( m => m.DropsPageModule),
    title: "Oni · Drops"
  },
  {
    path: 'collection',
    loadChildren: () => import('./pages/collection/collection.module').then( m => m.CollectionPageModule),
    title: "Oni · Collection"
  },
  {
    path: 'social',
    loadChildren: () => import('./pages/social/social.module').then( m => m.SocialPageModule),
    title: "Oni · Social"
  },
  {
    path: 'combat',
    loadChildren: () => import('./pages/combat/combat.module').then( m => m.CombatPageModule),
    title: "Oni · Combat"
  },
  {
    path: 'other',
    loadChildren: () => import('./pages/other/other.module').then( m => m.OtherPageModule),
    title: "Oni · Other"
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    title: "Oni · Login"
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
