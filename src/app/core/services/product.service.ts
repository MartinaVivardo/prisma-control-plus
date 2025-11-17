import { Injectable } from '@angular/core';
import { Product } from './models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productos: Product[] = [
    { id: 1, nombre: 'Leche entera Prisma', categoria: 'Lácteos', precio: 1200, stock: 30 },
    { id: 2, nombre: 'Pan lactal Prisma', categoria: 'Panadería', precio: 900, stock: 15 },
    { id: 3, nombre: 'Yerba Prisma Selección', categoria: 'Almacén', precio: 2500, stock: 8 },
    { id: 4, nombre: 'Gaseosa cola 1.5L', categoria: 'Bebidas', precio: 1800, stock: 22 },
    { id: 5, nombre: 'Fideos secos 500g', categoria: 'Almacén', precio: 750, stock: 40 },
    { id: 6, nombre: 'Queso cremoso', categoria: 'Lácteos', precio: 3200, stock: 12 },
    { id: 7, nombre: 'Galletitas dulces', categoria: 'Almacén', precio: 950, stock: 5 },
    { id: 8, nombre: 'Agua mineral 2L', categoria: 'Bebidas', precio: 1100, stock: 18 }
  ];

  getProductos(): Product[] {
    return this.productos;
  }

  actualizarStock(id: number, nuevoStock: number): void {
    const prod = this.productos.find(p => p.id === id);
    if (prod) {
      prod.stock = nuevoStock;
    }
  }

  agregarProducto(producto: Omit<Product, 'id'>): void {
    const maxId = this.productos.length
      ? Math.max(...this.productos.map(p => p.id))
      : 0;

    const nuevo: Product = {
      id: maxId + 1,
      ...producto
    };

    this.productos.push(nuevo);
  }
}

