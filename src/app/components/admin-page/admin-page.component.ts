import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { UserView } from "../../models/userView";



@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  users : UserView[] = [];
  

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers()
    .subscribe(users => {
      this.users=users;
      this.insertUsers(users);
    })
  }

  insertUsers(users : UserView[]){
    this.users=users;
    console.log(users);
  }

  delete(username : string){
    console.log(username);
    this.userService.deleteUser(username).subscribe();
    alert("Korisnik uspješno obrisan")
    this.reload();   
  }

  reload(){
    this.getUsers();
  }

}
