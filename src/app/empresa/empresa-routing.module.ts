import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaFormComponent } from './pages/empresa-form/empresa-form.component';
import { EmpresaListComponent } from './pages/empresa-list/empresa-list.component';

const routes: Routes = [
  { path: '', component: EmpresaListComponent },
  { path: 'nuevo', component: EmpresaFormComponent },
  { path: 'editar/:id', component: EmpresaFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
