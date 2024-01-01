import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const isLoggedIn = authService.isLoggedIn();

  if (!isLoggedIn) {
    router.navigate(['/admin/auth']);
  }

  return isLoggedIn;
};
