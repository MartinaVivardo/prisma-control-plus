import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario: string = '';
  password: string = '';
  error: string | null = null;

  constructor(private router: Router) {}

  iniciarSesion(): void {
    // Limpiamos error anterior
    this.error = null;

    if (this.usuario === 'empleado' && this.password === 'prisma') {
      // Guardamos sesión simulada
      localStorage.setItem('usuarioPrisma', this.usuario);

      alert('Inicio de sesión exitoso (simulado).');
      // Redirige al inicio
    this.router.navigate(['/inicio']);

    } else {
      this.error = 'Usuario o contraseña incorrectos.';
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuarioPrisma');
    alert('Sesión cerrada (simulada).');
  }
}
