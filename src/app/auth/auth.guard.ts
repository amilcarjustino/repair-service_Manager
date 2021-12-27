import { Injectable } from '@angular/core';
import { Route, CanLoad, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // const isAuth = this.authService.userIsAuthenticated.subscribe((isAuth_) => isAuth_);
    // console.log(isAuth);
    // this.authService.getUserStorageData();
    return this.authService.checkUserAuthenticated().then(user => {
      console.log(user);
      console.log(!user);
      if (!user) {
        console.log(user);
        this.router.navigateByUrl('/auth');
        return false;
      }
      return true;
    }
    );
  }
}
