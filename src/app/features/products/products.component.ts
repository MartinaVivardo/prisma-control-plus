import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Product } from '../../core/services/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productos: Product[] = [];
  productosFiltrados: Product[] = [];

  filtroNombre: string = '';
  filtroCategoria: string = 'todos';

  nuevoProducto = {
    nombre: '',
    categoria: 'Lácteos',
    precio: 0,
    stock: 0
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productos = this.productService.getProductos();
    this.aplicarFiltros();
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

  venderUnidad(prod: Product): void {
    if (prod.stock === 0) return;
    prod.stock--;
    this.productService.actualizarStock(prod.id, prod.stock);
  }

  agregarProducto(): void {
    if (!this.nuevoProducto.nombre.trim()) {
      return;
    }

    const precioNum = Number(this.nuevoProducto.precio);
    const stockNum = Number(this.nuevoProducto.stock);

    this.productService.agregarProducto({
      nombre: this.nuevoProducto.nombre.trim(),
      categoria: this.nuevoProducto.categoria,
      precio: precioNum,
      stock: stockNum
    });

    // recargar lista
    this.productos = this.productService.getProductos();
    this.aplicarFiltros();

    // resetear formulario
    this.nuevoProducto = {
      nombre: '',
      categoria: 'Lácteos',
      precio: 0,
      stock: 0
    };
  }
}

