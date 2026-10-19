import { Component, signal } from '@angular/core';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from '../services/fashion-apiservice';

@Component({
  selector: 'app-fashion-new-component',
  standalone: false,
  templateUrl: './fashion-new-component.html',
  styleUrl: './fashion-new-component.css',
})
export class FashionNewComponent {
  fashion = new Fashion(); // data for the form
  savedFashion = signal<Fashion | null>(null); // result returned from server
  errMessage = signal('');

  constructor(private _service: FashionAPIService) {}

  onFileSelected(event: any, fashion: Fashion) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      fashion.fashion_image = reader.result!.toString();
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  postFashion() {
    this.errMessage.set('');
    this._service.postFashion(this.fashion).subscribe({
      next: (data) => this.savedFashion.set(Object.assign(new Fashion(), data)),
      error: (err) => this.errMessage.set(err.message),
    });
  }
}
