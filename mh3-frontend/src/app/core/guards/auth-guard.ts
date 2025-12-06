import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { UserSessionService } from '@/core/services/user-session.service';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);
  const session = inject(UserSessionService);

  const code = session.getUserCode();

  // Ausnahmen, die ohne Code zugänglich sind
  const allowedPaths = [ 'privacy', 'imprint', 'login' ];

  // Extrahiere den Pfad ohne führenden Slash
  const currentPath = state.url.replace(/^\//, '');

  if (!code && !allowedPaths.includes(currentPath)) {
    // Weiterleitung auf Login
    return router.parseUrl('/login');
  }

  return true;
};
