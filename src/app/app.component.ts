import { Component, OnInit } from '@angular/core';
import { AuthService } from "../app/auth/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'my-app';

  constructor(private auth : AuthService,
    private router: Router) { }

    username : string;
  
    ngOnInit() {
    }

    onClick(){
      this.auth.signOut();
      this.router.navigateByUrl('/');
    }

    openProfile(){
      this.router.navigateByUrl('/profile');
    }


    isVisible() {
      if (this.router.url == '/' || this.router.url == '/login') {
        return false;
      }else{
        this.username= this.auth.getUsername();
        return true;
    }
}

}

