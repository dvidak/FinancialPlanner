import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { UserView } from '../../models/userView'


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor( private userService : UserService) { }

  user : UserView;

  ngOnInit() {
    this.getUser()
  }

  getUser(){
    this.userService.getUserProfile()
                      .subscribe( user => {
                          this.user=user;
                          this.insertUser(user);
                      });
  }

  insertUser(user : UserView){
    this.user=user;
    console.log(this.user);
  }

  

}
