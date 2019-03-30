import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  
  canActivate() {
    console.log("ušao u can activate");
    if (!this.auth.isTokenExpired()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}