import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  sayHello()
  {
    alert('Hello from Contact Component');
  }
  sayHello2(mydiv:HTMLElement)
  {
    mydiv.innerHTML = 'Nguyen Thi Long Lanh';
  }
}