import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SiniestrosService } from '../../services/siniestros.service';
import { MatPaginator, PageEvent, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-lista-siniestros',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginator, 
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

  constructor(private service: SiniestrosService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.service.listarSiniestros(this.pageIndex,
      this.pageSize).subscribe(data => {
        console.log(data.data);
      this.dataSource = data.data;
      this.totalElements = data.total;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.cargar();
  }
}
