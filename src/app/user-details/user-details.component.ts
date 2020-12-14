import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

import { AuthState, SignOut } from '../authentication/authentication.store';

@Component({
  selector: 'qd-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  constructor(private store: Store, private router: Router) {}

  public userState$ = this.store.select(AuthState.userDetails);

  signOut(): void {
    this.store.dispatch(new SignOut()).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
