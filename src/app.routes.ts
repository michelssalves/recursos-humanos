import { Routes } from '@angular/router';
import { DashboardComponent } from './app/rh';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' }  // O título deve ser colocado dentro de `data`
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'  // Adicionar `pathMatch` aqui também é uma boa prática
  }
];
