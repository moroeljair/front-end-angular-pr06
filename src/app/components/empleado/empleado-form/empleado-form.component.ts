import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Empleado } from '../../../models/empleado';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrl: './empleado-form.component.css',
})
export class EmpleadoFormComponent implements OnChanges {
  @Input() empleado: Empleado | null = null;
  @Output() guardar = new EventEmitter<Empleado>();

  formData: Empleado = this.empleadoVacio();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['empleado']?.currentValue) {
      this.formData = { ...changes['empleado'].currentValue };
    }
  }

  guardarEmpleado(): void {
    this.guardar.emit({ ...this.formData });
  }

  limpiarFormulario(form: NgForm): void {
    this.formData = this.empleadoVacio();
    form.resetForm(this.formData);
  }

  empleadoVacio(): Empleado {
    return { nombre: '', cargo: '', departamento: '', sueldo: 0 };
  }
}
