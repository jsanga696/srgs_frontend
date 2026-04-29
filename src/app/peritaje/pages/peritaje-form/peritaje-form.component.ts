import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ReactiveFormsModule, Validators, FormBuilder, FormControl } from '@angular/forms';
import { SiniestrosService } from 'src/app/siniestros/services/siniestros.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { debounceTime, finalize, map, of, switchMap } from 'rxjs';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import { CommonModule } from '@angular/common';
import { PageResponse } from 'src/app/dto/page_response';
import { Siniestro } from 'src/app/dto/siniestro';
import { PeritajeService } from '../../services/peritaje.service';
import { ConfirmDialogComponent } from '../../../layout/confirm_dialog/confirm-dialog.component';
import { Peritaje } from 'src/app/dto/peritaje';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-peritaje-form',
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
    MatCardModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './peritaje-form.component.html',
  styleUrl: './peritaje-form.component.scss'
})
export class PeritajeFormComponent implements OnInit {

  id!: string;
  archivos: File[] = [];
  previews: { file: File; url: string }[] = [];
  esEdicion: boolean = false;
  form: any;
  siniestroCtrl = new FormControl();
  siniestrosFiltrados: any[] = [];
  modoVer = false;
  peritoCtrl = new FormControl();
  peritosFiltrados: any[] = [];
  peritaje: Peritaje | undefined;

  constructor(private service: SiniestrosService, 
    private loadingService: LoadingService, 
    private snack: MatSnackBar, 
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuariosService: UsuariosService,
    private peritajesService: PeritajeService,
    private dialog: MatDialog){

  }
  
  ngOnInit() {
  
    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.form = this.fb.group({
      aseguradoCtrl: ['', Validators.required],
      id_siniestro: ['', Validators.required],
      codigoSiniestro: [''],
      idAsegurado: ['', Validators.required],
      identificacion_asegurado: [''],
      nombre_asegurado: [''],
      idVehiculo: ['', Validators.required],
      placaVehiculo: [''],
      peritoCtrl: ['', Validators.required], 
      idUsuarioPerito: ['', Validators.required],
      identificacion_perito: [''],
      nombre_perito: [''],
      detalles_siniestro: [{value:'', disabled: true}],
      detalles: [''],
      fecha: [this.getFechaActual(), Validators.required],
      personasHeridas: [{value: false, disabled: true}],
      necesitaGrua: [{value: false, disabled: true}],
      esPersonaNatural: [{value: false, disabled: true}],
      procede: [true]
    });

    if (this.id) {
      this.esEdicion = true;
      this.cargar();
    }

    this.siniestroCtrl.valueChanges
    .pipe(      
      debounceTime(300),
      switchMap(value => this.buscarSiniestro(value)),
      map(resp => resp.data)
    )
    .subscribe(data => {
      this.siniestrosFiltrados = data;
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

  descargarArchivo(id: string, nombre: string) {
    this.peritajesService.descargarArchivo(id).subscribe(blob => {

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = nombre; // 👈 nombre archivo
      a.click();

      window.URL.revokeObjectURL(url);
    });
  }

  cargar() {
    this.peritajesService.obtenerPorId(this.id)
      .subscribe(data => {
        this.form.patchValue(data);
        this.peritaje = data;
      });
  }

  getFechaActual(): string {
    const now = new Date();

    const pad = (n: number) => n.toString().padStart(2, '0');

    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  }
  
  buscarSiniestro(valor: string) {
      if (!valor || valor.length < 2) {
        return of({
          data: [],
          total: 0,
          page: 0,
          size: 0
        } as PageResponse<Siniestro>);
      }
  
      return this.service.listarSiniestros(0, 10, valor, 'Iniciado');
    }
  
    seleccionarSiniestro(event: any) {
      const siniestro = event.option.value;

      this.form.patchValue({
        id_siniestro: siniestro.id,
        idAsegurado: siniestro.id_asegurado,
        identificacion_asegurado: siniestro.identificacion_asegurado ,
        nombre_asegurado: siniestro.nombre_asegurado,
        idVehiculo: siniestro.id_vehiculo,
        placaVehiculo: siniestro.placa,
        detalles_siniestro: siniestro.detalles,
        personasHeridas: siniestro.personasHeridas,
        necesitaGrua: siniestro.necesitaGrua,
        esPersonaNatural: siniestro.esPersonaNatural,
        codigoSiniestro: siniestro.codigo
      });
    }
  
    displaySiniestro(a: any): string {
      return a ? `${a.codigo} ${a.nombre_asegurado}` : '';
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
        idUsuarioPerito: perito.id,
        identificacion_perito: perito.identificacion,
        nombre_perito: perito.nombres
      });
    }

    displayPerito(a: any): string {
      return a ? `${a.nombres}` : '';
    }
    
  onFileSelected(event: any) {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      this.archivos.push(file);

      const url = URL.createObjectURL(file);

      this.previews.push({
        file,
        url
      });
    }
  }

  eliminarArchivo(index: number) {
    URL.revokeObjectURL(this.previews[index].url); 
    
    this.previews.splice(index, 1);
    this.archivos.splice(index, 1);
  }

  guardar() {

    if (!this.form.get('id_siniestro')?.value) {
      this.snack.open('Debe seleccionar un siniestro', 'Error', { duration: 3000 });
      return;
    }

    if (!this.form.get('idUsuarioPerito')?.value) {
      this.snack.open('Debe seleccionar un perito', 'Error', { duration: 3000 });
      return;
    }

    const formValue = this.form.getRawValue();

    const formData = new FormData();

    formData.append('data', JSON.stringify(formValue));

    this.archivos.forEach(file => {
      formData.append('files', file);
    });

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '350px',
        data: {
          titulo: 'Confirmar',
          mensaje: '¿Estás seguro de continuar?'
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadingService.show();
          this.peritajesService.guardar(formData)
          .pipe(
              finalize(() => this.loadingService.hide())
            )
          .subscribe({
            next: () => {
              this.router.navigate(['/peritajes']);
              this.snack.open("Guardado correctamente", 'OK', {
                    duration: 3000,
                    panelClass: ['snackbar-success']
                  });
            },
            error: err => {
              console.error(err);
              this.snack.open("Error al guardar datos", 'Error', {
                    duration: 3000,
                    panelClass: ['snackbar-error']
                  });
            }
        });       
        } else {
          this.snack.open("", 'Cancelado', {
                duration: 3000,
                panelClass: ['snackbar-error']
              });
        }
      });
      
    
  }
}
