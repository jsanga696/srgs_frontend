import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PeritajeService } from '../../services/peritaje.service';
import { MatPaginator, PageEvent, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-peritaje-list',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginator, 
    MatPaginatorModule],
  templateUrl: './peritaje-list.component.html',
  styleUrl: './peritaje-list.component.scss'
})
export class PeritajeListComponent implements OnInit {

    totalElements = 0;
    timeout: any;
    pageSize = 10;
    pageIndex = 0;
    
    displayedColumns = ['codigo', 'asegurado', 'vehiculo', 'perito', 'fecha', 'detalles', 'acciones'];
    dataSource: any[] = [];
  
    constructor(private service: PeritajeService) {}
  
    ngOnInit() {
      this.cargar();
    }
  
    cargar() {
      this.service.listarPeritajes(this.pageIndex,
        this.pageSize).subscribe(data => {
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
