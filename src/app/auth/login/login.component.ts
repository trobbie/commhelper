import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  message: string;
  loginSub: Subscription = null;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in as ' + this.authService.userName : 'out');
  }

  private loginHelper() {
    this.message = 'Trying to log in ...';

    this.loginSub = this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '.';

        // Redirect the user
        this.router.navigate([redirect]);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

  login() {
    this.authService.isAdmin = false;
    this.loginHelper();
  }
  loginAdmin() {
    this.authService.isAdmin = true;
    this.loginHelper();
  }

  logoutAdmin() {
    this.authService.isAdmin = false;
    this.logout();
  }
}
