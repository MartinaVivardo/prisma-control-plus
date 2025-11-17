import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Product } from '../../core/services/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  usuarioActual: string | null = null;

  productos: Product[] = [];
  totalProductos = 0;
  stockTotal = 0;
  productosStockBajo = 0;
  categoriasCantidad = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Usuario simulado desde el login
    this.usuarioActual = localStorage.getItem('usuarioPrisma');

    // Datos para las métricas rápidas
    this.productos = this.productService.getProductos();
    this.calcularMetricas();
  }

  private calcularMetricas(): void {
    this.totalProductos = this.productos.length;

    this.stockTotal = this.productos.reduce(
      (acum, p) => acum + p.stock,
      0
    );

    this.productosStockBajo = this.productos.filter(p => p.stock <= 5).length;

    const categorias = new Set(this.productos.map(p => p.categoria));
    this.categoriasCantidad = categorias.size;
  }
}
