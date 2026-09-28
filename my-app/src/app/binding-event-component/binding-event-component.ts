import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-event-component',
  standalone: false,
  templateUrl: './binding-event-component.html',
  styleUrls: ['./binding-event-component.css'],
})
export class BindingEventComponent {
  a = 5;
  b = 10;
  result: number | string = 'Result here';

  doSolution(hsa: string, hsb: string): void {
    const parsedA = Number(hsa);
    const parsedB = Number(hsb);

    this.a = Number.isFinite(parsedA) ? parsedA : 0;
    this.b = Number.isFinite(parsedB) ? parsedB : 0;

    if (this.a === 0 && this.b === 0) {
      this.result = 'Vô số nghiệm';
    } else if (this.a === 0) {
      this.result = 'Không có nghiệm';
    } else {
      this.result = -this.b / this.a;
    }
  }
}