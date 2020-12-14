import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

import { AuthState } from './authentication.store';

@NgModule({
  declarations: [],
  imports: [CommonModule, SocialLoginModule, NgxsModule.forFeature([AuthState])],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '196343985299-n51p0jfl7jagm2qbms9cgi9kvq345g2u.apps.googleusercontent.com',
              { scope: 'profile email' },
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
})
export class AuthenticationModule {}
