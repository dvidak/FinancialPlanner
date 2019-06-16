import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, 
                public router: Router) {}
  
  canActivate() {
    if (!this.auth.isLoggedin()) {
        this.router.navigateByUrl('/login');
        return false;
    }
      return true;
    }
}
