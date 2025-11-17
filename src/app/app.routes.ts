import { inject } from '@angular/core';
import { Routes, CanActivateFn, Router } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { ProductsComponent } from './features/products/products.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { StatsComponent } from './features/stats/stats.component';

// Guard: si NO está logueado, lo manda al /login
const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('usuarioPrisma') !== null;

  // si está logueado, permite el acceso
  if (isLoggedIn) {
    return true;
  }

  // si NO está logueado, redirige al login
  return router.parseUrl('/login');
};

export const routes: Routes = [
  // Al entrar sin ruta -> login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login siempre accesible
  { path: 'login', component: LoginComponent },

  // Rutas protegidas por authGuard
  { path: 'inicio', component: HomeComponent, canActivate: [authGuard] },
  { path: 'productos', component: ProductsComponent, canActivate: [authGuard] },
  { path: 'caja', component: CheckoutComponent, canActivate: [authGuard] },
  { path: 'estadisticas', component: StatsComponent, canActivate: [authGuard] },

  // Cualquier ruta rara -> login
  { path: '**', redirectTo: 'login' }
];



