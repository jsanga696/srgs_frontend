import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculosService } from '../../services/vehiculos.service';
import { Vehiculo } from '../../../dto/vehiculo';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CitacionVehiculo } from 'src/app/dto/citacion_vehiculo';
import { LoadingService } from 'src/app/services/loading.service';
import { finalize } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-vehiculos',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    CommonModule,
    MatCardModule],
  templateUrl: './lista-vehiculos.component.html',
  styleUrl: './lista-vehiculos.component.scss'
})
export class ListaVehiculosComponent implements AfterViewInit {

  displayedColumns: string[] = ['placa', 'marca', 'modelo', 'color', 'propietario', 'acciones'];
  dataSource = new MatTableDataSource<Vehiculo>([]);
  citacionesDataSource = new MatTableDataSource<CitacionVehiculo>([]);

  totalElements = 0;
  timeout: any;
  pageSize = 10;
  pageIndex = 0;
  filtroPlaca: string = '';
  vehiculoSeleccionado: any = null;
  mostrarDetalle = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: VehiculosService, private loadingService: LoadingService, private snack: MatSnackBar) {}

  ngAfterViewInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.service.listarVehiculos(
      this.pageIndex,
      this.pageSize,
      this.filtroPlaca
    ).subscribe(res => {
      this.dataSource.data = res;
    });
  }

  buscar() {
    this.pageIndex = 0;
    this.cargarDatos();
  }

  buscarPlaca(){
    this.loadingService.show();

    this.service.consultarPorPlaca(this.vehiculoSeleccionado.placa)
    .pipe(
      finalize(() => this.loadingService.hide())
    )
    .subscribe({
      next: (res) => {
        this.vehiculoSeleccionado = res;
        this.citacionesDataSource.data = this.vehiculoSeleccionado.citaciones || [];

        if(this.vehiculoSeleccionado.citaciones.length == 0){
          this.snack.open("Sin datos", 'OK', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.cargarDatos();
  }

  buscarAuto() {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.buscar();
    }, 400);
  }

  limpiar() {
    this.filtroPlaca = '';
    this.buscar();
  }

  verDetalle(vehiculo: any) {
    this.vehiculoSeleccionado = vehiculo;
    this.citacionesDataSource.data = vehiculo.citaciones || [];
    this.mostrarDetalle = true;
  }

  volver() {
    this.mostrarDetalle = false;
    this.vehiculoSeleccionado = null;
  }
}
