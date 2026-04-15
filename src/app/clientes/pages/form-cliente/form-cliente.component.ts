import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-cliente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-cliente.component.html',
  styleUrl: './form-cliente.component.scss'
})
export class FormClienteComponent {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ClientesService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre: [''],
      email: [''],
      telefono: ['']
    });
  }

  guardar() {
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe(() => {
        this.form.reset();
      });
    }
  }
}
