import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css',
})
export class EmpleadoComponent implements OnInit {
  constructor(
    public empleadoService: EmpleadoService,
    private authService: AuthService,
  ) {}
  ngOnInit(): void {
    this.empleadoService.cargarEmpleados();
  }

  addEmpleado(empleado: Empleado): void {
    if (empleado.id) {
      this.empleadoService.updateEmpleado(empleado);
      return;
    }

    this.empleadoService.createEmpleado(empleado);
  }

  actualizarEmpleado(empleado: Empleado): void {
    this.empleadoService.selectEmpleado(empleado);
  }

  eliminarEmpleado(empleado: Empleado): void {
    const confirmar = window.confirm(`¿Deseas eliminar a ${empleado.nombre}?`);

    if (confirmar) {
      this.empleadoService.deleteEmpleado(empleado);
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
