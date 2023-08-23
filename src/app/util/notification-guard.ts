import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationGuard {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('token');

    if (!isLoggedIn) {
      this.router.navigate(['/login']).then(() => {
        console.log('Navigation to login completed');
      });
      return false;
    }

    return true;
  }
}
