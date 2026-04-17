import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AseguradoFormComponent } from './pages/asegurado-form/asegurado-form.component';
import { AseguradoListComponent } from './pages/asegurado-list/asegurado-list.component';

const routes: Routes = [
    { path: '', component: AseguradoListComponent },
    { path: 'nuevo', component: AseguradoFormComponent },
    { path: 'editar/:id', component: AseguradoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AseguradoRoutingModule { }
