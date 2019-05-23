import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/authentication.service";



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  show: boolean = false;


  constructor(private router: Router) { }

  ngOnInit() {
  }

  isVisible() {
    if (this.router.url == '/' || this.router.url == '/login') {
       return false;
    }else{
        return true;
    }
  }
}
