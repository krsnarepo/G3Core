import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

export const userTypeGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const allowedTypes = route.data['allowedTypes'] as string[];

  return authService.userType$.pipe(
    take(1),
    map(userType => {
      if (allowedTypes.includes(userType)) {
        return true;
      } else {
        alert('User not allowed');
        router.navigate(['/home']);
        return false;
      }
    })
  );
};
