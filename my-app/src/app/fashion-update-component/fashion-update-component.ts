import { Component, signal } from '@angular/core';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from '../services/fashion-apiservice';

@Component({
  selector: 'app-fashion-update-component',
  standalone: false,
  templateUrl: './fashion-update-component.html',
  styleUrl: './fashion-update-component.css',
})
export class FashionUpdateComponent {
  fashion = new Fashion(); // data for the form
  savedFashion = signal<Fashion | null>(null); // result returned from server
  errMessage = signal('');

  constructor(private _service: FashionAPIService) {}

  // Load the current data of a Fashion into the form by _id
  loadFashion(id: string) {
    this.errMessage.set('');
    this._service.getFashion(id).subscribe({
      next: (data) => {
        if (!data) {
          this.errMessage.set('Not found Fashion');
          return;
        }
        this.fashion = Object.assign(new Fashion(), data);
        this.fashion.fashion_image = ''; // keep old image unless a new one is chosen
        this.savedFashion.set(Object.assign(new Fashion(), data));
      },
      error: (err) => this.errMessage.set(err.message),
    });
  }

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

  putFashion() {
    this.errMessage.set('');
    this._service.putFashion(this.fashion).subscribe({
      next: (data) => this.savedFashion.set(Object.assign(new Fashion(), data)),
      error: (err) => this.errMessage.set(err.message),
    });
  }
}
