import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PeritajeService } from '../../services/peritaje.service';
import { MatPaginator, PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-peritaje-list',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatPaginator, 
    MatFormFieldModule,
    MatPaginatorModule,
    ReactiveFormsModule],
  templateUrl: './peritaje-list.component.html',
  styleUrl: './peritaje-list.component.scss'
})
export class PeritajeListComponent implements OnInit {

    totalElements = 0;
    timeout: any;
    pageSize = 10;
    pageIndex = 0;
    
    displayedColumns = ['codigo', 'asegurado', 'vehiculo', 'perito', 'fecha', 'detalles', 'acciones'];
    dataSource: any[] = [];

    filtroCodigo: string = '';
    filtroAsegurado: string = '';
    form: any;
  
    constructor(private service: PeritajeService, private fb: FormBuilder, private router: Router) {}
  
    ngOnInit() {
      this.form = this.fb.group({
        filtroCodigo: [''],
        filtroAsegurado: ['']
      });
      
      this.cargar();

      this.form.valueChanges
        .pipe(debounceTime(400))
        .subscribe((values: any) => {
          console.log("Entra");
          this.pageIndex = 0;
          this.buscarPeritajes(values);
        });
    }
  
    buscarPeritajes(filtros: any) {
      this.service.listarPeritajes(
        this.pageIndex,
        this.pageSize,
        filtros.filtroCodigo,
        filtros.filtroAsegurado
      ).subscribe(data => {
        this.dataSource = data.data;
        this.totalElements = data.total;
      });
    }

    cargar() {
      const filtros = this.form.getRawValue();

      this.service.listarPeritajes(
        this.pageIndex,
        this.pageSize,
        filtros.filtroAsegurado,
        filtros.filtroCodigo
      ).subscribe(data => {
        this.dataSource = data.data;
        this.totalElements = data.total;
      });
    }

    onPageChange(event: PageEvent) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.cargar();
      }

  verDetalle(vehiculo: any) {
    this.router.navigate(['/peritajes/ver', vehiculo.id]);
  }

}
