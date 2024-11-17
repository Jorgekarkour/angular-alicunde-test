import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  let isLoggedIn = false;
  userService.user$.subscribe(user => (isLoggedIn = user.isLoggedIn));

  // Determinar el comportamiento en función de `requiresAuth`
  const requiresAuth = route.data?.['requiresAuth'] ?? true;

  if (requiresAuth && !isLoggedIn) {
    router.navigate(['/']);
    return false;
  }

  if (!requiresAuth && isLoggedIn) {
    router.navigate(['/success']);
    return false;
  }

  return true;
};
