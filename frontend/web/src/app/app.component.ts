import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './auth/auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Community Helper';
  authServiceSub: Subscription = null;

  constructor(private authService: AuthService) {
  }
  ngOnInit() {
    // dev: auto-log in admin
    if (!environment.production ) {
      this.authService.isAdmin = true;
      this.authServiceSub = this.authService.login().subscribe(() => {});
    }
  }

  ngOnDestroy() {
    if (this.authServiceSub) {
      this.authServiceSub.unsubscribe();
    }
  }
}
