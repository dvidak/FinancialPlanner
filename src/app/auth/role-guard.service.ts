import { AuthService } from './authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {


  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userRole = this._authService.getRoleId();

    if (userRole === '1') {
      return true;
    }

     // navigate to not found page
     this._router.navigate(['/404']);
     return false;
   }
 
 }