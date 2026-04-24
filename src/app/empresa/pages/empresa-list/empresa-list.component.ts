import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-empresa-list',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './empresa-list.component.html',
  styleUrl: './empresa-list.component.scss'
})
export class EmpresaListComponent implements OnInit {

  displayedColumns = ['ruc', 'nombre', 'razon_social', 'celular', 'email', 'direccion', 'acciones'];
  dataSource: any[] = [];

  constructor(private service: EmpresaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.service.listarEmpresas().subscribe(data => {
      this.dataSource = data;
    });
  }
  
}
