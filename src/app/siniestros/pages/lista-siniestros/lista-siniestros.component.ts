import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SiniestrosService } from '../../services/siniestros.service';
import { MatPaginator, PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-lista-siniestros',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatPaginator, 
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatPaginatorModule],
  templateUrl: './lista-siniestros.component.html',
  styleUrl: './lista-siniestros.component.scss'
})
export class ListaSiniestrosComponent implements OnInit {

  totalElements = 0;
  timeout: any;
  pageSize = 10;
  pageIndex = 0;
  
  displayedColumns = ['codigo', 'asegurado', 'vehiculo', 'fecha', 'ubicacion', 'acciones'];
  dataSource: any[] = [];
  filtroCodigo: string = '';
  filtroAsegurado: string = '';
  form: any;

  constructor(private service: SiniestrosService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      filtroCodigo: [''],
      filtroAsegurado: ['']
    });

    this.cargar();

    this.form.valueChanges
    .pipe(debounceTime(400))
    .subscribe((values: any) => {
      this.pageIndex = 0;
      this.buscarSiniestro(values);
    });    
  }

  buscarSiniestro(filtros: any) {
    this.service.listarSiniestros(
      this.pageIndex,
      this.pageSize,
      filtros.filtroAsegurado,
      filtros.filtroCodigo,
      undefined
    ).subscribe(data => {
      this.dataSource = data.data;
      this.totalElements = data.total;
    });
  }

  cargar() {
    const filtros = this.form.getRawValue();

    this.service.listarSiniestros(
      this.pageIndex,
      this.pageSize,
      filtros.filtroAsegurado,
      filtros.filtroCodigo,
      undefined
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

  verDetalle(siniestro: any){
    this.router.navigate(['/siniestros/ver', siniestro.id]);
  }
}
