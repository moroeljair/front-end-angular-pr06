import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';

  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login(): void {
    if (!this.email || !this.password) {
      this.error = 'Ingrese email y contraseña';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/empleados']);
        },

        error: (error) => {
          this.loading = false;

          this.error = 'Email o contraseña incorrectos';
        },
      });
  }
}
