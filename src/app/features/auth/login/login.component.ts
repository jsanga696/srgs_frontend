import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

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

  constructor(private fb: FormBuilder, private router: Router) {
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

    console.log(username, password);

    // 👉 redirigir
    this.router.navigate(['/dashboard']);
  }
}