import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { EmpresaService } from 'src/app/empresa/services/empresa.service';
import { MatTableDataSource } from '@angular/material/table';
import { Empresa } from 'src/app/dto/empresa';
import { AseguradoService } from '../../services/asegurado.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-asegurado-form',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatSnackBarModule],
  templateUrl: './asegurado-form.component.html',
  styleUrl: './asegurado-form.component.scss'
})
export class AseguradoFormComponent implements OnInit {

  form!: FormGroup;
  empresas: any[] = [];
  id: string | null = null;
  esEdicion = false;

  columnasVehiculos = [
    'placa',
    'marca',
    'modelo',
    'anio',
    'color',
    'acciones'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private aseguradoService: AseguradoService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      identificacion: ['', Validators.required],
      nombres: ['', Validators.required],
      pais: [''],
      provincia: [''],
      ciudad: [''],
      direccion: [''],
      telefono: [''],
      celular: [''],
      email: ['', Validators.email],
      activo: [true],
      esPersonaNatural: [true],
      empresa: [null, Validators.required],
      vehiculos: this.fb.array([])
    });

    this.cargarEmpresas();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.esEdicion = true;
      this.cargarDatos(this.id);
    }
  }
  
  cargarDatos(id: string) {
    this.aseguradoService.consultarPorIdentificacion(id)
      .subscribe(data => {
        this.form.patchValue({
          ...data,
          empresa: data.empresa?.id
        });

        this.vehiculos.clear();

        data.vehiculos.forEach((v: any) => {
          this.vehiculos.push(this.crearVehiculoForm(v));
        });

      });
  }

  cargarEmpresas() {
    this.empresaService.listarEmpresas().subscribe(res => {
      this.empresas = res;

      this.empresas.sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      );
    });
  }

  get vehiculos(): FormArray {
    return this.form.get('vehiculos') as FormArray;
  }

  crearVehiculoForm(data?: any): FormGroup {
    return this.fb.group({
      placa: [data?.placa || '', Validators.required],
      marca: [data?.marca || ''],
      color: [data?.color || ''],
      modelo: [data?.modelo || ''],
      anio: [data?.anio || ''],
      fechaMatricula: [data?.fechaMatricula || ''],
      fechaCaducidad: [data?.fechaCaducidad || '']
    });
  }

  agregarVehiculo() {
    this.vehiculos.push(this.crearVehiculoForm());
  }

  eliminarVehiculo(index: number) {
    this.vehiculos.removeAt(index);
  }

  guardar() {
    const data = this.form.getRawValue();

    if (this.esEdicion) {
      
      const payload = {
        ...data,
        empresa: {
          id: data.empresa
        }
      };

      this.aseguradoService.actualizar(this.id!, payload)
        .subscribe({
          next: () => {
            this.snack.open("Datos guardados correctamente", 'OK', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
            this.router.navigate(['/asegurados']);
          },
          error: () => this.snack.open("Error al guardar", 'OK', {
              duration: 3000,
              panelClass: ['snackbar-error']
            })
        });

    } else {

      this.aseguradoService.guardarAsegurado(data)
        .subscribe({
          next: () => {
            this.snack.open("Datos guardados correctamente", 'OK', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
            this.router.navigate(['/asegurados']);
          },
          error: () => this.snack.open("Error al guardar", 'OK', {
            duration: 3000,
            panelClass: ['snackbar-error']
          })
        });

    }
  }

  // =========================
  // VOLVER
  // =========================
  volver() {
    this.router.navigate(['/asegurados']);
  }

}
