import { Component } from '@angular/core';

interface Customer {
  id: string;
  name: string;
  email: string;
  age: number;
  image: string;
}

interface CustomerGroup {
  id: number;
  title: string;
  customers: Customer[];
}

@Component({
  selector: 'app-ex18',
  standalone: false,
  styleUrls: ['./ex18.css'],
  templateUrl: './ex18.html',
})
export class Ex18Component {
  public customerGroups: CustomerGroup[] = [
    {
      id: 1,
      title: 'VIP',
      customers: [
        {
          id: 'Cus123',
          name: 'Obama',
          email: 'obama@gmail.com',
          age: 67,
          image: 'assets/avatars/obama.jpg'
        },
        {
          id: 'Cus456',
          name: 'Kim jong Un',
          email: 'unun@gmail.com',
          age: 38,
          image: 'assets/avatars/kju.jpg'
        },
        {
          id: 'Cus789',
          name: 'Putin',
          email: 'putin@gmail.com',
          age: 77,
          image: 'assets/avatars/putin.jpg'
        }
      ]
    },
    {
      id: 2,
      title: 'Normal',
      customers: [
        {
          id: 'Cus000',
          name: 'Hồ Cẩm Đào',
          email: 'hodao@gmail.com',
          age: 16,
          image: 'assets/avatars/hcd.jpg'
        },
        {
          id: 'Cus111',
          name: 'Tap Can Binh',
          email: 'binhbinh@gmail.com',
          age: 67,
          image: 'assets/avatars/tcb.jpg'
        },
        {
          id: 'Cus222',
          name: 'Trump',
          email: 'trump@gmail.com',
          age: 79,
          image: 'assets/avatars/trump.jpg'
        }
      ]
    }
  ];
}
