import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import { fromPromise } from 'rxjs/internal-compatibility';
import { tap } from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface UserInfoModel {
  email: string;
  name: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  provider: string;
  token: string;
}

export interface AuthStateModel {
  user?: UserInfoModel;
}

export class SignInWithGoogle {
  static readonly type = '[Auth] Sign In With Google';
}

export class SignOut {
  static readonly type = '[Auth] Sign Out';
}

const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>('auth');

@State<AuthStateModel>({
  name: AUTH_STATE_TOKEN,
  defaults: {
    user: undefined,
  },
})
@Injectable()
export class AuthState {
  constructor(private authService: SocialAuthService) {}

  @Selector()
  static isAuthenticated(state: AuthStateModel) {
    return !!state.user;
  }

  @Selector()
  static userDetails(state: AuthStateModel) {
    return state.user;
  }

  @Action(SignInWithGoogle)
  signInWithGoogle(ctx: StateContext<AuthStateModel>) {
    return fromPromise(this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)).pipe(
      tap((userDetails) => {
        ctx.setState({
          user: {
            firstName: userDetails.firstName,
            email: userDetails.email,
            lastName: userDetails.email,
            name: userDetails.name,
            photoUrl: userDetails.photoUrl,
            provider: userDetails.provider,
            token: userDetails.authToken,
          },
        });
      }),
    );
  }

  @Action(SignOut)
  signOut(ctx: StateContext<AuthStateModel>) {
    return fromPromise(this.authService.signOut(true)).pipe(
      tap(() => {
        ctx.setState({ user: undefined });
      }),
    );
  }
}
