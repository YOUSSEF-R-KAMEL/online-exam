import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { ForgotPasswordComponent } from './core/pages/auth/forgot-password/forgot-password.component';
import { VerifyCodeComponent } from './core/pages/auth/verify-code/verify-code.component';
import { SetPasswordComponent } from './core/pages/auth/set-password/set-password.component';
import { SigninComponent } from './core/pages/auth/signin/signin.component';
import { SignupComponent } from './core/pages/auth/signup/signup.component';
import { loggedGuard } from './core/guards/logged.guard';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './feature/home/home.component';

export const routes: Routes = [
  {path: '', redirectTo: 'auth/signin', pathMatch: 'full'},
  {path: "auth", component: AuthLayoutComponent,
    canActivate: [loggedGuard],
    children: [
      {path: 'signin', component: SigninComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'forget-password', component: ForgotPasswordComponent},
      {path: 'verify-code', component: VerifyCodeComponent},
      {path: 'set-password', component: SetPasswordComponent},
    ]
  },
  {path: '', canActivate: [authGuard], children: [
  {path: "home", component: HomeComponent}
  ]}
];
