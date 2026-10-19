import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Simulating login check from localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    return true; // Allow entry
  } else {
    alert('You are not logged in! Please log in first.');
    // Redirect to the login page and remember where the user wanted to go
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }
};
