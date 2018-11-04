import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Community Helper';

  constructor(private authService: AuthService) {
  }
  ngOnInit() {
    // dev: auto-log in admin
    if (!environment.production ) {
      this.authService.isAdmin = true;
      this.authService.login().subscribe(() => {});
    }
  }
}
