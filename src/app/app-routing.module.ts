import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticatedGuard } from './authentication/authenticated.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: 'login',
    component: SignInComponent,
  },
  {
    path: 'user-details',
    component: UserDetailsComponent,
    canActivate: [AuthenticatedGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-details',
  },
  {
    path: '*',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
