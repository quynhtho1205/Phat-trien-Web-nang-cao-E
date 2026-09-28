import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/IProduct';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'app-product-list-call-service-component',
  standalone: false,
  templateUrl: './product-list-call-service.html',
  styleUrls: ['./product-list-call-service.css'],
})
export class ProductListCallServiceComponent implements OnInit {
  min_price = 0;
  max_price = 100;
  products: Product[] = [];

  constructor(private ps: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const allProducts = this.ps.getProductList();
    this.products = allProducts.filter((product) => {
      const min = Number(this.min_price ?? 0);
      const max = Number(this.max_price ?? Number.MAX_SAFE_INTEGER);
      return product.price >= min && product.price <= max;
    });
  }

  filterProducts(): void {
    this.loadProducts();
  }
}