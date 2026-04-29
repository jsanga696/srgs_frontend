import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaSiniestrosComponent } from './pages/lista-siniestros/lista-siniestros.component';
import { FormSiniestrosComponent } from './pages/form-siniestros/form-siniestros.component';

const routes: Routes = [
  { path: '', component: ListaSiniestrosComponent },
  { path: 'nuevo', component: FormSiniestrosComponent },
  { path: 'editar/:id', component: FormSiniestrosComponent },
  { path: 'ver/:id', component: FormSiniestrosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiniestrosRoutingModule { }
