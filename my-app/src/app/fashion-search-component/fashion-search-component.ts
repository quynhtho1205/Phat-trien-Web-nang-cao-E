import { Component, signal } from '@angular/core';
import { Fashion } from '../classes/Fashion';
import { createFashionSlug } from '../classes/FashionSlugHelper';
import { FashionAPIService } from '../services/fashion-apiservice';

@Component({
  selector: 'app-fashion-search-component',
  standalone: false,
  templateUrl: './fashion-search-component.html',
  styleUrl: './fashion-search-component.css',
})
export class FashionSearchComponent {
  field: 'name' | 'detail' = 'name';
  keyword = '';
  fashions = signal<Fashion[]>([]);
  searched = signal(false);
  errMessage = signal('');

  constructor(private _service: FashionAPIService) {}

  search() {
    this.errMessage.set('');
    this._service.searchFashions(this.field, this.keyword.trim()).subscribe({
      next: (data) => {
        this.fashions.set(data.map((f: any) => Object.assign(new Fashion(), f)));
        this.searched.set(true);
      },
      error: (err) => this.errMessage.set(err.message),
    });
  }

  slugOf(f: Fashion): string {
    return createFashionSlug(f.fashion_subject, f._id);
  }
}
