import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SuccessPageComponent } from './components/success-page/success-page.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
    canActivate: [AuthGuard],
    data: { requiresAuth: false },
  },
  {
    path: 'success',
    component: SuccessPageComponent,
    canActivate: [AuthGuard],
    data: { requiresAuth: true },
  },
];

