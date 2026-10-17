import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Empleado } from '../../../models/empleado';

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html',
  styleUrl: './empleado-list.component.css',
})
export class EmpleadoListComponent {
  @Input() empleados: Empleado[] = [];
  @Output() actualizar = new EventEmitter<Empleado>();
  @Output() eliminar = new EventEmitter<Empleado>();
}
