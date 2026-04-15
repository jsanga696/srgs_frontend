import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaClientesComponent } from './pages/lista-clientes/lista-clientes.component';
import { FormClienteComponent } from './pages/form-cliente/form-cliente.component';

const routes: Routes = [
  { path: '', component: ListaClientesComponent },
  { path: 'nuevo', component: FormClienteComponent },
  { path: 'editar/:id', component: FormClienteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
