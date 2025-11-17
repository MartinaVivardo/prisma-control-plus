import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Product } from '../../core/services/models/product.model';
import { ProductService } from '../../core/services/product.service';

type EstadoStock = 'critico' | 'bajo' | 'ok';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  // Lista original de productos
  productos: Product[] = [];
  // Lista que se muestra en la tabla (con filtros aplicados)
  productosFiltrados: Product[] = [];

  // Filtros
  filtroNombre: string = '';
  filtroCategoria: string = 'todos';

  // Resumen
  stockTotal: number = 0;
  productosStockBajo: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productos = this.productService.getProductos();
    this.aplicarFiltros();
    this.actualizarResumen();
  }

  aplicarFiltros(): void {
    this.productosFiltrados = this.productos.filter(p => {
      const coincideNombre =
        this.filtroNombre === '' ||
        p.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase());

      const coincideCategoria =
        this.filtroCategoria === 'todos' ||
        p.categoria === this.filtroCategoria;

      return coincideNombre && coincideCategoria;
    });
  }

  private actualizarResumen(): void {
    this.stockTotal = this.productos.reduce(
      (acum, p) => acum + p.stock,
      0
    );

    this.productosStockBajo = this.productos.filter(p => p.stock <= 5).length;
  }

  incrementarStock(producto: Product, cantidad: number = 1): void {
    producto.stock += cantidad;
    this.productService.actualizarStock(producto.id, producto.stock);
    this.actualizarResumen();
  }

  disminuirStock(producto: Product, cantidad: number = 1): void {
    if (producto.stock === 0) return;

    const resta = Math.min(cantidad, producto.stock);
    producto.stock -= resta;
    this.productService.actualizarStock(producto.id, producto.stock);
    this.actualizarResumen();
  }

  obtenerEstado(producto: Product): EstadoStock {
    if (producto.stock <= 2) return 'critico';
    if (producto.stock <= 5) return 'bajo';
    return 'ok';
  }
}




