import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material";
import {SavingsComponent} from "../savings/savings.component";
import { AuthService} from '../../auth/authentication.service';
import { SubcategoryService } from "../../services/subcategory.service";
import { UserService } from "../../services/user.service";
import { SubcategoryView } from "../../models/subcategoryView";
import { UserView } from "../../models/userView";
import { newSaving } from 'src/app/models/newSaving';

import * as moment from 'moment';
import { SavingsService } from 'src/app/services/savings.service';



@Component({
  selector: 'app-add-saving-modal',
  templateUrl: './add-saving-modal.component.html',
  styleUrls: ['./add-saving-modal.component.css']
})
export class AddSavingModalComponent implements OnInit {
  date: Date;
  dateMoment=moment();
  saveDate: any;
  form: any = {};
  subcategoryExpense: SubcategoryView[] = [];
  users : UserView[] = [];
  subcatSelected : number;
  userSelected: string = 'null';
  savingInfo : newSaving;




  constructor(private dialogRef: MatDialogRef<SavingsComponent>,
              private authService: AuthService,
              private subcategoryService: SubcategoryService,
              private savingsService: SavingsService,
              private userService: UserService) { }

  ngOnInit() {
    this.getSubcategory();
    this.getUsers();
    this.deleteLogged();
  }

  getSubcategory(){
    this.subcategoryService.getSubcategoriesExpense()
        .subscribe(subcategoryExpense => {
          this.subcategoryExpense=subcategoryExpense;
          this.insertSubcategoryExpense(subcategoryExpense);
        })
  }

  insertSubcategoryExpense(subcategory : SubcategoryView[]){
    this.subcategoryExpense = subcategory;
  }

  getUsers(){
    this.userService.getUsers()
    .subscribe(users => {
      this.users=users;
      this.insertUsers(users);
    })
  }

  deleteLogged(){
    this.users.forEach((user,index) => {
      if (user.id =+ this.authService.getUserID){
          this.users.splice(index,1);
      }  
    });
  }

  insertUsers(users : UserView[]){
    this.users=users;
  }

  selectedSub(subcatSelected : number){
    this.subcatSelected = subcatSelected;
  }

  selectedUser(userSelected : string){
    if(userSelected != null){
      this.userSelected = userSelected;
    }
  }


  onSubmit(){
    console.log("Saveee");
    this.dateMoment = moment(this.form.date);
    this.saveDate = this.dateMoment.format('MM/DD/YYYY');

    this.savingInfo = new newSaving(
          this.subcatSelected,
          this.form.description,
          this.form.amount_init,
          this.form.amount,
          this.saveDate,
          this.authService.getUserID(),
          this.userSelected,
          );
      console.log(this.savingInfo);
      this.savingsService.newSavings(this.savingInfo).subscribe();
      this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
