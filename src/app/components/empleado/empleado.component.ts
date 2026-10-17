import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css',
})
export class EmpleadoComponent implements OnInit {
  constructor(public empleadoService: EmpleadoService) {}
  ngOnInit(): void {
    this.empleadoService.cargarEmpleados();
  }

  addEmpleado(empleado: Empleado): void {
    this.empleadoService.createEmpleado(empleado);
  }

  actualizarEmpleado(empleado: Empleado): void {
    console.log('Actualizar empleado:', empleado);
  }

  eliminarEmpleado(empleado: Empleado): void {
    const confirmar = window.confirm(
      `¿Deseas eliminar a ${empleado.nombre}?`,
    );

    if (confirmar) {
      this.empleadoService.deleteEmpleado(empleado);
    }
  }
}
