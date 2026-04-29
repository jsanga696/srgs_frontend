import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormBuilder, FormControl } from '@angular/forms';
import { SiniestrosService } from '../../services/siniestros.service';
import { LoadingService } from 'src/app/services/loading.service';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Vehiculo } from 'src/app/dto/vehiculo';
import { Asegurado } from 'src/app/dto/asegurado';
import { debounceTime, of, switchMap } from 'rxjs';
import { AseguradoService } from 'src/app/asegurado/services/asegurado.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../layout/confirm_dialog/confirm-dialog.component';
import { Siniestro } from 'src/app/dto/siniestro';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-form-siniestros',
  standalone: true,
  imports: [CommonModule,
  ReactiveFormsModule,
  RouterModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatDividerModule,
  MatCardModule,
  MatIconModule],
  templateUrl: './form-siniestros.component.html',
  styleUrl: './form-siniestros.component.scss'
})
export class FormSiniestrosComponent implements OnInit {

  esEdicion = false;
  id!: string;
  form: any;
  vehiculo!: Vehiculo;
  asegurado!: Asegurado;
  aseguradoCtrl = new FormControl();
  aseguradosFiltrados: any[] = [];

  peritoCtrl = new FormControl();
  peritosFiltrados: any[] = [];
  modoVer = false;
  siniestro: Siniestro | undefined;

  constructor(private service: SiniestrosService, 
    private loadingService: LoadingService, 
    private snack: MatSnackBar, 
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private aseguradoService: AseguradoService,
    private usuariosService: UsuariosService,
    private dialog: MatDialog){

  }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.form = this.fb.group({
      aseguradoCtrl: ['', Validators.required],
      id_asegurado: ['', Validators.required],
      identificacion_asegurado: [''],
      nombre_asegurado: [''],
      id_vehiculo: ['', Validators.required],
      placa: [''],
      peritoCtrl: ['', Validators.required], 
      id_usuario_perito: ['', Validators.required],
      identificacion_perito: [''],
      nombre_perito: [''],
      fecha: [this.getFechaActual(), Validators.required],
      ubicacion: [''],
      detalles: [''],
      personasHeridas: [false],
      necesitaGrua: [false],
      esPersonaNatural: [false],
      activo: [true]
    });

    if (this.id) {
      this.esEdicion = true;
      this.cargar();
    }

    this.aseguradoCtrl.valueChanges
    .pipe(
      debounceTime(300),
      switchMap(value => this.buscarAsegurado(value))
    )
    .subscribe(data => {
      this.aseguradosFiltrados = data;
    });

    this.peritoCtrl.valueChanges
    .pipe(
      debounceTime(300),
      switchMap(value => this.buscarPerito(value))
    )
    .subscribe(data => {
      this.peritosFiltrados = data;
    });

    const url = this.router.url;
    
    if (url.includes('ver')) {
      this.modoVer = true;
    } else if (url.includes('editar')) {
      this.esEdicion = true;
    }
  }

  getFechaActual(): string {
    const now = new Date();

    const pad = (n: number) => n.toString().padStart(2, '0');

    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  }

  buscarAsegurado(valor: string) {
    if (!valor || valor.length < 2) {
      return of([]);
    }

    return this.aseguradoService.listarAseguradosByName(valor);
  }

  seleccionarAsegurado(event: any) {
    const asegurado = event.option.value;

    this.form.patchValue({
      id_asegurado: asegurado.id,
      identificacion_asegurado: asegurado.identificacion,
      nombre_asegurado: asegurado.nombres
    });
  }

  displayAsegurado(a: any): string {
    return a ? `${a.nombres}` : '';
  }

  buscarPerito(valor: string) {
    if (!valor || valor.length < 2) {
      return of([]);
    }

    return this.usuariosService.listarUsuarios(0, 20, valor);
  }
  
  seleccionarPerito(event: any) {
    const perito = event.option.value;

    this.form.patchValue({
      id_usuario_perito: perito.id,
      identificacion_perito: perito.identificacion,
      nombre_perito: perito.nombres
    });
  }

  displayPerito(a: any): string {
    return a ? `${a.nombres}` : '';
  }

  cargar() {
    this.service.obtenerPorId(this.id)
      .subscribe(data => {
        this.form.patchValue(data);
        this.siniestro = data;
        console.log(data);
      });
  }

  guardar() {

    if (!this.form.get('id_asegurado')?.value) {
      this.snack.open('Debe seleccionar un asegurado', 'Error', { duration: 3000 });
      return;
    }

    if (!this.form.get('placa')?.value) {
      this.snack.open('Debe ingresar la placa', 'Error', { duration: 3000 });
      return;
    }

    if (!this.form.get('id_vehiculo')?.value) {
      this.snack.open('Debe buscar un vehículo válido', 'Error', { duration: 3000 });
      return;
    }

    if (!this.form.get('id_usuario_perito')?.value) {
      this.snack.open('Debe seleccionar un perito', 'Error', { duration: 3000 });
      return;
    }

    if (this.esEdicion) {
      this.service.actualizar(this.id, this.form.value)
        .subscribe(() => this.router.navigate(['/siniestros']));
    } else {
      this.service.crear(this.form.value)
        .subscribe(() => this.router.navigate(['/siniestros']));
    }
  }

  buscarVehiculo(){
    this.service.buscarPlaca(this.form.get('placa')?.value).subscribe(
      data => {
        this.vehiculo = data;
        
        if(data != null){

          this.form.patchValue({
            id_vehiculo: data.id,
            placa: data.placa
          });
          
          this.snack.open("Vehículo encontrado", 'OK', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
        }else{
          this.snack.open("Sin datos", 'OK', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
          
          this.form.get('placa')?.setValue('');
        }
    });
  }

  abrirConfirmacion(idConfirm: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        titulo: 'Confirmar',
        mensaje: '¿Estás seguro de continuar?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(idConfirm == 1){
          this.guardar()
        }        
      } else {
        this.snack.open("", 'Cancelado', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
      }
    });
  }

}
