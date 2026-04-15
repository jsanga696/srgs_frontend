import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaVehiculosComponent } from './pages/lista-vehiculos/lista-vehiculos.component';
import { FormVehiculosComponent } from './pages/form-vehiculos/form-vehiculos.component';

const routes: Routes = [
  { path: '', component: ListaVehiculosComponent },
  { path: 'nuevo', component: FormVehiculosComponent },
  { path: 'editar/:id', component: FormVehiculosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculosRoutingModule { }
