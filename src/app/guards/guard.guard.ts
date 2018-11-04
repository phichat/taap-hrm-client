import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromPubService from 'src/app/services';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private s_users: fromPubService.UsersService,) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // if (this.s_users.getCookie('vt_id')) {
      //   // logged in so return true
        return true;
      // }
  
      // // not logged in so redirect to login page with the return url
      // // , { queryParams: { returnUrl: state.url } }
      // window.location.href = 'http://203.151.56.136/hrm/backoffice/backend/login.php';
      // return false;
  }
}
