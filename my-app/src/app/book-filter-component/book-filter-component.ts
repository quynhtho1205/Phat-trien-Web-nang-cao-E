import { Component, signal } from '@angular/core';
import { BookAPIService } from '../services/book-apiservice';
import { IBook } from '../classes/Book';

@Component({
  selector: 'app-book-filter-component',
  standalone: false,
  templateUrl: './book-filter-component.html',
  styleUrl: './book-filter-component.css',
})
export class BookFilterComponent {
  books = signal<IBook[]>([]);
  errMessage = signal('');
  server_images_link = '/images/';

  constructor(private _service: BookAPIService) {}

  filterBooks(min: string, max: string) {
    this.errMessage.set('');
    this._service.getBooksByPriceRange(Number(min), Number(max)).subscribe({
      next: (data) => this.books.set(data),
      error: (err) => this.errMessage.set(err.message),
    });
  }
}
