import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { Book, IBook } from '../classes/Book';
import { BookAPIService } from '../services/book-apiservice';

@Component({
  selector: 'app-book-update-component',
  standalone: false,
  templateUrl: './book-update-component.html',
  styleUrl: './book-update-component.css',
})
export class BookUpdateComponent {
  book = new Book();
  books = signal<IBook[]>([]);
  errMessage = signal('');
  server_images_link = '/images/';

  constructor(private _service: BookAPIService, private _cdr: ChangeDetectorRef) {
    this._service.getBooks().subscribe({
      next: (data) => this.books.set(data),
      error: (err) => this.errMessage.set(err.message),
    });
  }

  // Function to handle row click
  selectBook(bookId: string) {
    this._service.getBook(bookId).subscribe({
      next: (data) => {
        // Assign the returned data to the current book object on the form
        this.book = data;
        this._cdr.detectChanges();
      },
      error: (err) => this.errMessage.set(err.message),
    });
  }

  putBook() {
    this._service.putBook(this.book).subscribe({
      next: (data) => this.books.set(data),
      error: (err) => this.errMessage.set(err.message),
    });
  }

  // Function to handle file selection
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.book.Image = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.book.ImageBase64 = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}