import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado';
import { BehaviorSubject, map } from 'rxjs';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  URL_API = 'http://localhost:3000/api/v1/empleados';

  //URL_API='assets/json/empleado.json';

  // URL_API='https://jsonplaceholder.typicode.com/users';

  private readonly empleadosSubject = new BehaviorSubject<Empleado[]>([]);
  readonly empleados$ = this.empleadosSubject.asObservable();

  private readonly selectedEmpleadoSubject = new BehaviorSubject<Empleado>({
    nombre: '',
    cargo: '',
    departamento: '',
    sueldo: 0,
  });

  get selectedEmpleado(): Empleado {
    return this.selectedEmpleadoSubject.value;
  }

  constructor(private http: HttpClient) {
    console.log('El servicio está funcionando...');
  }

  cargarEmpleados(): void {
    this.http
      .get<ApiResponse<Empleado[]>>(this.URL_API)
      .pipe(map((response) => response.data))
      .subscribe({
        next: (empleados) => this.empleadosSubject.next([...empleados]),
        error: (error) =>
          console.error('No se pudieron cargar los empleados', error),
      });
  }

  createEmpleado(empleado: Empleado): void {
    this.http
      .post<ApiResponse<Empleado>>(this.URL_API, empleado)
      .pipe(map((response) => response.data))
      .subscribe({
        next: (nuevoEmpleado) => {
          this.empleadosSubject.next([
            ...this.empleadosSubject.value,
            nuevoEmpleado,
          ]);
          this.resetSelectedEmpleado();
        },
        error: (error) => console.error('No se pudo crear el empleado', error),
      });
  }

  deleteEmpleado(empleado: Empleado): void {
    if (!empleado.id) {
      console.error('No se puede eliminar un empleado sin _id');
      return;
    }

    this.http
      .delete<ApiResponse<null>>(`${this.URL_API}/${empleado.id}`)
      .subscribe({
        next: () => {
          const empleadosActuales = this.empleadosSubject.value;
          this.empleadosSubject.next(
            empleadosActuales.filter((actual) => actual.id !== empleado.id),
          );
        },
        error: (error) =>
          console.error('No se pudo eliminar el empleado', error),
      });
  }

  updateSelectedEmpleado(campo: keyof Empleado, valor: string | number): void {
    this.selectedEmpleadoSubject.next({
      ...this.selectedEmpleadoSubject.value,
      [campo]: valor,
    });
  }

  resetSelectedEmpleado(): void {
    this.selectedEmpleadoSubject.next({
      nombre: '',
      cargo: '',
      departamento: '',
      sueldo: 0,
    });
  }
}
