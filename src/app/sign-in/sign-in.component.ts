import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

import { SignInWithGoogle } from '../authentication/authentication.store';

@Component({
  selector: 'qd-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  constructor(private store: Store, private router: Router) {}

  public signInWithGoogle(): void {
    this.store.dispatch(new SignInWithGoogle()).subscribe(() => {
      this.router.navigate(['/user-details']);
    });
  }
}
