import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../classes/IProduct';
import { extractIdFromSlug, getIdentityType } from '../classes/SlugHelper';
import { ProductHttpHandleErrorService } from '../services/product-http-handle-error-service';

@Component({
  selector: 'app-product-detail-component',
  standalone: false,
  styleUrl: './product-detail-component.css',
  templateUrl: './product-detail-component.html',
})
export class ProductDetailComponent {
  product = signal<Product | null>(null);
  errMessage = signal('');

  public checkIdentityType = getIdentityType;
  public getIdFromSlug = extractIdFromSlug;

  constructor(
    private _service: ProductHttpHandleErrorService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((param) => {
      const idParam = param.get('id');

      if (idParam != null) {
        const type = this.checkIdentityType(idParam);
        let id: number = -1;

        switch (type) {
          case 'ID':
            id = parseInt(idParam, 10);
            break;
          case 'SLUG_WITH_ID':
            id = this.getIdFromSlug(idParam) ?? -1;
            break;
          case 'PURE_SLUG':
            id = -1;
            break;
        }

        this._service.getProductById(id).subscribe({
          next: (data) => {
            this.product.set(data ?? null);
          },
          error: (err) => {
            this.errMessage.set(err);
          }
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}