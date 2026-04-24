import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EmpresaService } from '../../services/empresa.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-empresa-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule],
  templateUrl: './empresa-form.component.html',
  styleUrl: './empresa-form.component.scss'
})
export class EmpresaFormComponent implements OnInit {

  id: number | null = null;
  esEdicion = false;
  
  form: any;

  constructor(
    private fb: FormBuilder,
    private service: EmpresaService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.id = Number(idParam);
    }

    if (this.id) {
      this.esEdicion = true;
      this.cargar(this.id);
    }

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      razon_social: ['', Validators.required],
      ruc: ['', Validators.required],
      telefono: [''],
      celular: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', Validators.required],
      pais: [''],
      provincia: [''],
      ciudad: [''],
      activo: [true]
    })
  }

  cargar(id: number) {
    this.service.obtenerPorId(id).subscribe(data => {
      this.form.patchValue(data);
    });
  }

  guardar() {
    const data = this.form.getRawValue();

    if (this.esEdicion) {
      this.service.actualizar(this.id!, data).subscribe({
        next: () => {
          this.snack.open("Datos guardados correctamente", 'OK', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
          this.router.navigate(['/empresas']);
        },
        error: () => this.snack.open("Error al guardar", 'OK', {
            duration: 3000,
            panelClass: ['snackbar-error']
          })
      });
    } else {
      this.service.guardarEmpresa(data).subscribe({
        next: () => {
          this.snack.open("Datos guardados correctamente", 'OK', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
          this.router.navigate(['/empresas']);
        },
        error: () => this.snack.open("Error al guardar", 'OK', {
          duration: 3000,
          panelClass: ['snackbar-error']
        })
      });
    }
  }
  
}
