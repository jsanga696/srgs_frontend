import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmpresaService } from '../../services/empresa.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-empresa-list',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatPaginator,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './empresa-list.component.html',
  styleUrl: './empresa-list.component.scss'
})
export class EmpresaListComponent implements OnInit {

  displayedColumns = ['ruc', 'nombre', 'razon_social', 'celular', 'email', 'direccion', 'acciones'];
  dataSource: any[] = [];

  filtroRuc: string = '';
  filtroNombre: string = '';
  filtroRazonSocial: string = '';
  pageSize = 4;
  pageIndex = 0;
  totalElements = 0;
  form: any;

  constructor(private service: EmpresaService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      filtroRuc: [''],
      filtroNombre: [''],
      filtroRazonSocial: ['']
    });
    
    this.cargarDatos();

    this.form.valueChanges
      .pipe(debounceTime(400))
      .subscribe((values: any) => {
        console.log("Entra");
        this.pageIndex = 0;
        this.buscarEmpresas(values);
      });  
  }

  buscarEmpresas(filtros: any) {
    this.service.listarEmpresas(
        this.pageIndex,
        this.pageSize,
        filtros.filtroRuc,
        filtros.filtroNombre,
        filtros.filtroRazonSocial
      ).subscribe(data => {
        this.dataSource = data.data;
        this.totalElements = data.total;
      });
  }

  cargarDatos() {
      this.service.listarEmpresas(
        this.pageIndex,
        this.pageSize,
        this.filtroRuc,
        this.filtroNombre,
        this.filtroRazonSocial,
      ).subscribe(res => {
        this.dataSource = res.data;
        this.totalElements = res.total;
        this.pageSize = res.size;
        console.log(res)
      });
    }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.cargarDatos();
  }
  
}
