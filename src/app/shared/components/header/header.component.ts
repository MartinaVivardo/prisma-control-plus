import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router) {}

  // Devuelve true si hay sesión guardada
  isLoggedIn(): boolean {
    return localStorage.getItem('usuarioPrisma') !== null;
  }

  logout(): void {
    localStorage.removeItem('usuarioPrisma');
    this.router.navigate(['/login']);
  }
}
