import { Component, ViewChild } from '@angular/core';
import { Router, RouterModule  } from '@angular/router';

import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../services/loading.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginService } from 'src/app/features/auth/login/services/login.service';

@Component({
  standalone: true,
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ]
})
export class ShellComponent {
  
  isCollapsed = false;
  loading = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
  }

  constructor(private loadingService: LoadingService, private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    this.loadingService.loading$.subscribe(value => {
      this.loading = value;
    });
  }

  salir(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}