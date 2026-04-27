import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from './services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class LoginComponent {

  form;

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService, private snack: MatSnackBar) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /*login() {
    if (this.form.invalid) return;

    const { username, password } = this.form.value;

    console.log('Login:', username, password);

    // 👉 luego aquí irá el backend
    this.router.navigate(['/dashboard']);
  }*/

    login() {
    if (this.form.invalid) return;

    const { username, password } = this.form.value;

    this.loginService.login(username as string, password as string).subscribe({
      next: (res) => {
          this.loginService.guardarToken(res);
          this.router.navigate(['/vehiculos']);
          this.snack.open("Bienvenido", 'OK', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
      },
      error: (err) => {
        this.snack.open("Credenciales inválidas", 'Error', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
      }
    });
  }
}