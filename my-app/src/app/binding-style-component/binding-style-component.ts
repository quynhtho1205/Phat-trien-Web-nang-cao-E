import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-style-component',
  standalone: false,
  templateUrl: './binding-style-component.html',
  styleUrl: './binding-style-component.css',
})
export class BindingStyleComponent {
  progressValue: number = 80; // Value range: 0 - 100

  // 4 equal ranges: 1-25, 26-50, 51-75, 76-100
  // light red -> red -> light green -> green
  get statusColor(): string {
    if (this.progressValue <= 25) {
      return 'lightcoral';
    }
    if (this.progressValue <= 50) {
      return 'red';
    }
    if (this.progressValue <= 75) {
      return 'lightgreen';
    }
    return 'green';
  }
}