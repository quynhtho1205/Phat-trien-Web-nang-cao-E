import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-two-way-component',
  standalone: false,
  templateUrl: './binding-two-way-component.html',
  styleUrls: ['./binding-two-way-component.css'],
})
export class BindingTwoWayComponent {
  // Model for the product input
  productName: string = 'Default Product';
}