import { Injectable } from '@angular/core';
import { Route, CanLoad, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return this.authService.userIsAuthenticated.pipe(
        
        tap(isAuthenticated => {
          console.log(isAuthenticated);
          if (!isAuthenticated) {
            this.router.navigateByUrl('/auth');
          }
        })
      );
  }
}
