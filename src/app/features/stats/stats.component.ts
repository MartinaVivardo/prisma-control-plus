
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from '../../core/services/models/product.model';
import { ProductService } from '../../core/services/product.service';

interface ResumenCategoria {
  categoria: string;
  cantidadProductos: number;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit {

  productos: Product[] = [];

  totalProductos: number = 0;
  stockTotal: number = 0;
  productosStockBajo: number = 0;
  resumenCategorias: ResumenCategoria[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productos = this.productService.getProductos();
    this.calcularEstadisticas();
  }

  calcularEstadisticas(): void {
    this.totalProductos = this.productos.length;

    this.stockTotal = this.productos.reduce(
      (acum, p) => acum + p.stock,
      0
    );

    this.productosStockBajo = this.productos.filter(p => p.stock <= 5).length;

    // Resumen por categoría
    const mapa = new Map<string, number>();

    this.productos.forEach(p => {
      const actual = mapa.get(p.categoria) ?? 0;
      mapa.set(p.categoria, actual + 1);
    });

    this.resumenCategorias = Array.from(mapa.entries()).map(([categoria, cantidad]) => ({
      categoria,
      cantidadProductos: cantidad
    }));
  }
}
