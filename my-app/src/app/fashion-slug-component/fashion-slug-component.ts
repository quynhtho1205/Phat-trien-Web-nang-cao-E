import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fashion } from '../classes/Fashion';
import { createFashionSlug, extractFashionIdFromSlug } from '../classes/FashionSlugHelper';
import { FashionAPIService } from '../services/fashion-apiservice';

@Component({
  selector: 'app-fashion-slug-component',
  standalone: false,
  templateUrl: './fashion-slug-component.html',
  styleUrl: './fashion-slug-component.css',
})
export class FashionSlugComponent {
  fashion = signal<Fashion | null>(null);
  errMessage = signal('');

  constructor(
    private _service: FashionAPIService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    // React every time the slug in the URL changes
    this._route.paramMap.subscribe((params) => {
      const slug = params.get('slug') || '';
      const id = extractFashionIdFromSlug(slug);
      if (!id) {
        this.errMessage.set('Invalid fashion link');
        return;
      }
      this.loadFashion(id, slug);
    });
  }

  loadFashion(id: string, slug: string) {
    this.errMessage.set('');
    this._service.getFashion(id).subscribe({
      next: (data) => {
        if (!data) {
          this.errMessage.set('Not found Fashion');
          return;
        }
        const f = Object.assign(new Fashion(), data);
        this.fashion.set(f);
        // Canonical URL: if the name part of the slug is outdated, fix it in the address bar
        const correctSlug = createFashionSlug(f.fashion_subject, f._id);
        if (slug !== correctSlug) {
          this._router.navigate(['/fashion', correctSlug], { replaceUrl: true });
        }
      },
      error: (err) => this.errMessage.set(err.message),
    });
  }
}
