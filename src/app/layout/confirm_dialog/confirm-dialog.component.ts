import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.titulo }}</h2>

    <mat-dialog-content>
      {{ data.mensaje }}
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close="false">Cancelar</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="true">
        Confirmar
      </button>
    </mat-dialog-actions>
  `,
  imports: [MatDialogModule, MatButtonModule]
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}