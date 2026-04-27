import { Routes } from '@angular/router';

import { ShellComponent } from '../app/layout/shell/shell.component';
import { DashboardComponent } from '../app/features/dashboard/dashboard.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent},

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
      },

      {
        path: 'asegurados',
        loadChildren: () =>
          import('./asegurado/asegurado.module').then(m => m.AseguradoModule)
      },

      {
        path: 'empresas',
        loadChildren: () =>
          import('./empresa/empresa.module').then(m => m.EmpresaModule)
      },

      {
        path: 'peritajes',
        loadChildren: () =>
          import('./peritaje/peritaje.module').then(m => m.PeritajeModule)
      }
    ]
  }
];