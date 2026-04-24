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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-vehiculos',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    CommonModule,
    MatCardModule],
  templateUrl: './form-vehiculos.component.html',
  styleUrl: './form-vehiculos.component.scss'
})
export class FormVehiculosComponent implements AfterViewInit {

  displayedColumns: string[] = ['placa', 'marca', 'modelo', 'color', 'propietario', 'acciones'];
  dataSource = new MatTableDataSource<Vehiculo>([]);
  citacionesDataSource = new MatTableDataSource<CitacionVehiculo>([]);

  totalElements = 0;
  timeout: any;
  pageSize = 10;
  pageIndex = 0;
  filtroPlaca: string = '';
  vehiculoSeleccionado?: Vehiculo;
  mostrarDetalle = false;
  id: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private route: ActivatedRoute, private service: VehiculosService, private loadingService: LoadingService, private snack: MatSnackBar, private router: Router) {

  }

  ngAfterViewInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.cargarDatos(this.id);
    }
  }

  cargarDatos(id: string) {
    this.service.consultarPorId(
      id
    ).subscribe(res => {
      this.vehiculoSeleccionado = res
      this.citacionesDataSource.data = this.vehiculoSeleccionado.citaciones || [];
    });
  }

  buscarPlaca(placa: any){
    this.loadingService.show();

    this.service.consultarPorPlaca(placa)
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
}
