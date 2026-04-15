import { Routes } from '@angular/router';

import { ShellComponent } from '../app/layout/shell/shell.component';
import { DashboardComponent } from '../app/features/dashboard/dashboard.component';
import { UsersComponent } from '../app/features/users/users.component';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },

      {
        path: 'clientes',
        loadChildren: () =>
          import('./clientes/clientes.module').then(m => m.ClientesModule)
      },

      {
        path: 'siniestros',
        loadChildren: () =>
          import('./siniestros/siniestros.module').then(m => m.SiniestrosModule)
      },

      {
        path: 'vehiculos',
        loadChildren: () =>
          import('./vehiculos/vehiculos.module').then(m => m.VehiculosModule)
      }
    ]
  }
];