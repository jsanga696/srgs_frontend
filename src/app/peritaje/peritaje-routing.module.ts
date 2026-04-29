import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeritajeFormComponent } from './pages/peritaje-form/peritaje-form.component';
import { PeritajeListComponent } from './pages/peritaje-list/peritaje-list.component';

const routes: Routes = [
  { path: '', component: PeritajeListComponent },
  { path: 'nuevo', component: PeritajeFormComponent },
  { path: 'editar/:id', component: PeritajeFormComponent },
  { path: 'ver/:id', component: PeritajeFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeritajeRoutingModule { }
