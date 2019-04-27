import { Component, OnInit } from '@angular/core';
import { SavingsService } from 'src/app/services/savings.service';
import { AuthService } from 'src/app/auth/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { SavingsView } from 'src/app/models/savingsView';
import {MatDialog } from "@angular/material";
import { AddSavingModalComponent } from "../add-saving-modal/add-saving-modal.component";
import { UserView } from 'src/app/models/userView';
import * as moment from 'moment';



@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.css']
})
export class SavingsComponent implements OnInit {

  panelOpenState = false;
  id : string;
  savings: SavingsView [];
  savingsExist: boolean;
  visible : boolean = false;
  creator : boolean =false ;
  docreator: boolean = false;
  users: UserView [] = [];

  constructor(private savingsServce: SavingsService,
              private auth : AuthService,
              private userService: UserService,
              public dialog: MatDialog)  {}

  ngOnInit() {
    this.getSavings();
    this.getUsers();
    this.id = this.auth.getUserID();
    console.log(this.creator);
    console.log(this.docreator);
  }
    

  getSavings() {
    console.log(this.savingsServce);
    this.savingsServce.getSavings()
                      .subscribe( savings => {
                          this.savings=savings;
                          this.insertSavings(this.savings)
                      },error => this.savingsExist=false);
  }

  getUsers(){
    this.userService.getUsers()
                    .subscribe( users => {
                      this.users = users;
                      this.insertUsers(this.users);
                    })
  }

  insertSavings(savings: SavingsView []){
    this.savings=savings;
    if(savings === null){
      this.savingsExist = false;
    }
    this.savingsExist=true;
    console.log(this.savings);
  }

  insertUsers(users : UserView[]){
    this.users=users;
    console.log(this.users)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddSavingModalComponent, {
      width: '500px',
    });
    console.log("Ušao")
  }
}
