import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SuccessPageComponent } from './components/success-page/success-page.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: '', component: LoginFormComponent, canActivate: [LoginGuard] },
  { path: 'success', component: SuccessPageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
