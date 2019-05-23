import { Component, OnInit } from '@angular/core';
import {ItemsService} from "../../services/item.service";
import {ItemView} from "../../models/itemView";
import {MatDialog } from "@angular/material";
import * as moment from 'moment';
import * as Plotly from "plotly.js/dist/plotly-basic.js";

import { AddItemModalComponent} from "../add-item-modal/add-item-modal.component"


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: ItemView[];
  itemExist: boolean = false;
  hide: boolean;
  p: number = 1;
  date : Date = new Date();
  currentMonthExpense = 0;
  lastMonthExpense = 0;
  twoMonthAgoExpense = 0;
  currentMonthIncome = 0;
  lastMonthIncome = 0;
  twoMonthAgoIncome = 0;

  Plotly: any;



  constructor(private itemsService: ItemsService,
              public dialog: MatDialog) { }

  ngOnInit() {
    console.log("dohvacam");
    this.getItems();
  }

  
  getItems() {
    this.itemsService.getItems()
                      .subscribe( items => {
                          this.items=items;
                          this.insertItems(this.items)
                      },error => this.itemExist=false);
  }

  insertItems(items : ItemView[]){
    this.items=items;
    if(items === null){
      this.itemExist = false;
    }
    this.itemExist=true;
    console.log(items);
    console.log(this.itemExist);
    this.calculateCharBar();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddItemModalComponent, {
      width: '500px',
    });
    console.log("Ušao")
  }

  calculateCharBar(): void {
    var month = this.date.getMonth();
    if(this.itemExist){
    this.items.forEach(element => {
        var tempDate = new Date (element.boughtAt);
        if(element.subcategory_id ==1 || element.subcategory_id ==2 || element.subcategory_id ==3){
          if (tempDate.getMonth() === month) {
            this.currentMonthIncome += + element.amount;
          }else if (tempDate.getMonth() === (month-1)){
            this.lastMonthIncome += +element.amount;
          }else if (tempDate.getMonth() === (month-2)){
            this.twoMonthAgoIncome +=+ element.amount;
          }
        }else{
          if (tempDate.getMonth() === month) {
            this.currentMonthExpense += + element.amount;
          }else if (tempDate.getMonth() === (month-1)){
            this.lastMonthExpense += +element.amount;
          }else if (tempDate.getMonth() === (month-2)){
            this.twoMonthAgoExpense +=+ element.amount;
          }
      }
    });
  }
  var trace1 = {
    x: [month-1 + 'mj', month + 'mj', month+1 + 'mj'],
    y: [this.twoMonthAgoExpense, this.lastMonthExpense, this.currentMonthExpense],
    name: 'Troškovi',
    type: 'bar',
    marker: {
      color: '#3a2735'
    }
  };
  
  var trace2 = {
    x: [month-1 + 'mj', month + 'mj', month+1 + 'mj'],
    y: [this.twoMonthAgoIncome, this.lastMonthIncome, this.currentMonthIncome],
    name: 'Primanja',
    type: 'bar',
    marker:{
      color: '#ada3b7'
    }
  };
  
  var data = [trace1, trace2];
  
  var layout = {
    height: 350,
    width: 350,
    barmode: 'group'};
  
  Plotly.newPlot('myDiv', data,layout);
}

}
