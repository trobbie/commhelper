import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  isAdmin = false;
  userName = '';

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor() { }

  login(): Observable<boolean> {
    return of(true).pipe(
      // delay(1000), // for simulation
      tap(val => {
        this.isLoggedIn = true;
        if (this.isAdmin) {
          this.userName = 'Admin';
        } else {
          this.userName = 'TestUser';
        }
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
