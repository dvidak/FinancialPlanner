import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, 
                public router: Router) {}
  
  canActivate() {
    console.log("ušao u can activate");
    if (!this.auth.isLoggedin()) {
        console.log("nije logiran")
        this.router.navigateByUrl('/login');
        return false;
    }
      console.log("logiran je");
      return true;
    }
}
