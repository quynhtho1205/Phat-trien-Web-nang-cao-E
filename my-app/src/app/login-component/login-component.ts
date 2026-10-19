import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../classes/UserLogin';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  user = new UserLogin();

  constructor(private router: Router) {}

  onLogin(): void {
    if (this.user.username === 'admin' && this.user.password === '123') {
      localStorage.setItem('isLoggedIn', 'true');
      alert('Login successful.');
      return;
    }

    localStorage.removeItem('isLoggedIn');
    alert('Username or password is incorrect.');
  }

  onLogout(): void {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
