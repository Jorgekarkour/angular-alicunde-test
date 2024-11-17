import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const LoginGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  let isLoggedIn = false;
  userService.user$.subscribe(user => (isLoggedIn = user.isLoggedIn));

  if (isLoggedIn) {
    router.navigate(['/success']); // Redirigir si ya está autenticado
    return false;
  }

  return true;
};

