import { Component, OnInit } from '@angular/core';
import { ItemsService } from "../../services/item.service";
import { SubcategoryService } from "../../services/subcategory.service";
import { SubcategoryView } from "../../models/subcategoryView";
import {MatDialog, MatDialogRef} from "@angular/material";
import { ItemsComponent } from '../items/items.component';
import { newItem } from 'src/app/models/newItem';
import { AuthService} from '../../auth/authentication.service';
import { FormGroup } from '@angular/forms';


import * as moment from 'moment';




@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.css']
})
export class AddItemModalComponent implements OnInit {
  date: Date;
  dateMoment=moment();
  saveDate: any;
  form: any = {};
  subItem: number;
  
  
  type: string;
  options: string[] = ['Primanje', 'Trošak']
  radioOptions: FormGroup;

  
  subcategoryIncome: SubcategoryView[] = [];
  subcategoryExpense: SubcategoryView[] = [];

  itemInfo: newItem;

  constructor(private matDialogRef: MatDialogRef<ItemsComponent>,
              private dialog: MatDialog,
              private itemsService: ItemsService,
              private authService: AuthService,
              private subcategoryService: SubcategoryService) { }

  ngOnInit() {
    this.getSubcategory();
  }

  getSubcategory() {
    console.log("pozvan income")
    this.subcategoryService.getSubcategoriesIncome()
        .subscribe(subcategoryIncome => {
            this.subcategoryIncome = subcategoryIncome;
            this.insertSubcategoryIncome(subcategoryIncome);
        });
    console.log("pozvan expense")

    this.subcategoryService.getSubcategoriesExpense()
        .subscribe(subcategoryExpense => {
          this.subcategoryExpense=subcategoryExpense;
          this.insertSubcategoryExpense(subcategoryExpense);
        })

  }

  insertSubcategoryIncome(subcategory : SubcategoryView[]){
      this.subcategoryIncome = subcategory;
      console.log(this.subcategoryIncome);
  }

  insertSubcategoryExpense(subcategory : SubcategoryView[]){
    this.subcategoryExpense = subcategory;
    console.log(this.subcategoryExpense);
}

  

  onSubmit(){
    console.log("bok")
    this.dateMoment = moment(this.form.date);
    this.saveDate = this.dateMoment.format('MM/DD/YYYY');

    this.itemInfo = new newItem(
          this.subItem,
          this.form.description,
          //stavim validaciju da mora bit točka
          this.form.amount,
          this.saveDate,
          this.authService.getUserID()
          );
      console.log(this.itemInfo);
      this.itemsService.newItem(this.itemInfo).subscribe();
      this.closeDialog();
      window.location.reload();

  }

  closeDialog() {
    this.matDialogRef.close();
  }

  selectedSub(subItem){
    this.subItem = subItem;
    console.log(this.subItem);
  }

  


}
