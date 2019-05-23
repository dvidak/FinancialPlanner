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
    console.log(this.subcategoryExpense);
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
    console.log(this.users);
  }

  selectedSub(subcatSelected : number){
    this.subcatSelected = subcatSelected;
    console.log(this.subcatSelected);
  }

  selectedUser(userSelected : string){
    this.userSelected = userSelected;
    console.log(this.userSelected);
  }


  onSubmit(){
    console.log("bok")
    this.dateMoment = moment(this.form.date);
    this.saveDate = this.dateMoment.format('MM/DD/YYYY');

    this.savingInfo = new newSaving(
          this.subcatSelected,
          this.form.description,
          this.form.amount_init,
          this.form.amount,
          this.saveDate,
          this.authService.getUserID(),
          null
          );
      this.savingsService.newSavings(this.savingInfo).subscribe();
      console.log(this.savingInfo);
  }

  closeDialog() {
    window.location.reload();
    this.dialogRef.close();
  }

}
