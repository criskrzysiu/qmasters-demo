import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

import { AuthState } from './authentication/authentication.store';

@Component({
  selector: 'qd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store, private router: Router) {}

  public isAuthenticated$ = this.store.select(AuthState.isAuthenticated);

  title = 'QmastersDemo';

  navigateToUserDetails() {
    this.router.navigate(['/user-details']);
  }
}
