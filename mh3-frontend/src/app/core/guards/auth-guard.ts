import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);

  const userId = localStorage.getItem('uid');

  // Ausnahmen, die ohne UserID zugänglich sind
  const allowedPaths = [ 'datenschutz', 'imprint', 'login' ];

  // Extrahiere den Pfad ohne führenden Slash
  const currentPath = state.url.replace(/^\//, '');

  if (!userId && !allowedPaths.includes(currentPath)) {
    // Weiterleitung auf Login
    return router.parseUrl('/login');
  }

  return true;
};
