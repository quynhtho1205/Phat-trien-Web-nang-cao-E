import { Component, signal } from '@angular/core';
import { Product } from '../classes/IProduct';
import { createSlug } from '../classes/SlugHelper';
import { ProductHttpHandleErrorService } from '../services/product-http-handle-error-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list-search-component',
  standalone: false,
  templateUrl: './product-list-search-component.html',
  styleUrl: './product-list-search-component.css',
})
export class ProductListSearchComponent {
  // Toàn bộ sản phẩm từ server
  products = signal<Product[]>([]);
  //check error
  errMessage = signal("");
  // Sản phẩm sau khi đã lọc
  filteredProducts = signal<Product[]>([]);
  // Biến giữ giá trị lọc để hiển thị lên UI
  minPrice = signal<number | null>(null);
  maxPrice = signal<number | null>(null);
  public generateSlug = createSlug;

  constructor(
    private _service: ProductHttpHandleErrorService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 1. Tải toàn bộ sản phẩm về trước
    this._service.getProductList().subscribe({
      next: (data) => {
        this.products.set(data);
        this.watchQueryParams();
      },
      error: (err) => {
        this.errMessage.set(err);
      }
    });
  }

  private watchQueryParams() {
    this.activateRoute.queryParamMap.subscribe(params => {
      const minValue = params.get('min');
      const maxValue = params.get('max');

      const min = minValue === null || minValue === '' ? null : Number(minValue);
      const max = maxValue === null || maxValue === '' ? null : Number(maxValue);

      this.minPrice.set(min);
      this.maxPrice.set(max);

      const minLimit = min ?? 0;
      const maxLimit = max ?? Number.MAX_SAFE_INTEGER;
      const result = this.products().filter(p => p.price >= minLimit && p.price <= maxLimit);
      this.filteredProducts.set(result);
    });
  }

  // Hàm gọi khi nhấn nút "Lọc"
  onFilter() {
    const min = this.minPrice();
    const max = this.maxPrice();

    this.router.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: {
        min: min ?? null,
        max: max ?? null
      },
      queryParamsHandling: 'merge'
    });
  }

  showAll() {
    this.minPrice.set(null);
    this.maxPrice.set(null);
    this.router.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: {
        min: null,
        max: null
      },
      queryParamsHandling: 'merge'
    });
  }

  viewDetail(id: number) {
    this.router.navigate(["/products", id]);
  }

  viewDetailSlug(p: Product) {
    let slug = this.generateSlug(p.name, p.id);
    this.router.navigate(["/products", slug]);
  }
}