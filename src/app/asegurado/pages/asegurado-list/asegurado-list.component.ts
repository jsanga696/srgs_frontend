import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AseguradoService } from '../../services/asegurado.service';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Asegurado } from 'src/app/dto/asegurado';
import { CitacionVehiculo } from 'src/app/dto/citacion_vehiculo';
import { Vehiculo } from 'src/app/dto/vehiculo';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PageResponse } from 'src/app/dto/page_response';

@Component({
  selector: 'app-asegurado-list',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    ReactiveFormsModule],
  templateUrl: './asegurado-list.component.html',
  styleUrl: './asegurado-list.component.scss'
})
export class AseguradoListComponent implements AfterViewInit {
    displayedColumns: string[] = ['identificacion', 'nombres', 'empresa', 'direccion', 'fecha_creacion', 'acciones'];
    dataSource = new MatTableDataSource<Asegurado>([]);
    vehiculosDataSource = new MatTableDataSource<Vehiculo>([]);
    citacionesDataSource = new MatTableDataSource<CitacionVehiculo>([]);
  
    totalElements = 0;
    timeout: any;
    pageSize = 10;
    pageIndex = 0;
    filtroIdentificacion: string = '';
    aseguradoSeleccionado: any = null;
    mostrarDetalle = false;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    constructor(private service: AseguradoService, private router: Router) {}
  
    columnasVehiculos = [
      'placa',
      'marca',
      'modelo',
      'anio',
      'color',
      'acciones'
    ];

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.cargarDatos();
    }
  
    cargarDatos() {
      this.service.listarAsegurados(
        this.pageIndex,
        this.pageSize,
        this.filtroIdentificacion
      ).subscribe(res => {
        this.dataSource.data = res.data;
        this.totalElements = res.total;
      });
    }
  
    buscar() {
      this.pageIndex = 0;
      this.cargarDatos();
    }
  
    onPageChange(event: PageEvent) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.cargarDatos();
    }
  
    buscarAsegurado() {
      clearTimeout(this.timeout);
  
      this.timeout = setTimeout(() => {
        this.buscar();
      }, 400);
    }
  
    limpiar() {
      this.filtroIdentificacion = '';
      this.buscar();
    }
  
    verDetalle(v: Asegurado) {
      this.router.navigate(['/asegurados/ver', v.id]);
    }

    irNuevo() {
      this.router.navigate(['/asegurados/nuevo']);
    }
  
    volver() {
      this.mostrarDetalle = false;
      this.aseguradoSeleccionado = null;
    }

    editar(v: Asegurado) {
      this.router.navigate(['/asegurados/editar', v.id]);
    }

    verDetalleVehiculo(id: string) {
    this.router.navigate(['/vehiculos/ver', id]);
  }
}
