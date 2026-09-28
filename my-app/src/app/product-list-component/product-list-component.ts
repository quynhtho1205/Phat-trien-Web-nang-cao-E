import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/IProduct';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'app-product-list-component',
  standalone: false,
  styleUrls: ['./product-list-component.css'],
  templateUrl: './product-list-component.html',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProductList();
  }
}
