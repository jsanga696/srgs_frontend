import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AseguradoRoutingModule } from './asegurado-routing.module';
import { AseguradoListComponent } from './pages/asegurado-list/asegurado-list.component';
import { AseguradoFormComponent } from './pages/asegurado-form/asegurado-form.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AseguradoRoutingModule,
    RouterModule,
    AseguradoListComponent,
    AseguradoFormComponent
  ]
})
export class AseguradoModule { }
