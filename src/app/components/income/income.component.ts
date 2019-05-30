import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../auth/authentication.service";
import { Router } from "@angular/router";
import {FormControl} from '@angular/forms';
import {ItemsService} from "../../services/item.service";
import {ItemView} from "../../models/itemView";
import * as Plotly from "plotly.js/dist/plotly-basic.js";
import * as _moment from 'moment';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {Moment} from 'moment';
import {MatDatepicker} from '@angular/material/datepicker';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})


export class IncomeComponent implements OnInit {
   Plotly: any;
   hideOther: boolean;
   hideIncome: boolean;
   isExpenseEmpty: boolean = true;
   hideCurrentIncome : boolean;
   hideCurrentExpense: boolean;
   date : Date = new Date();
   items: ItemView[];
   itemsByDate: ItemView[];
   itemsForPicked: ItemView[];
   itemExist: boolean;
   itemsByDateExist: boolean = true;
   itemIncome: ItemView[];
   itemExpense: ItemView[];
   itemByCategoryList: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
   itemByCategoryLastMonthList: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
   itemByCategoryTwoMonthsAgoList:  number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
   datePicked = new FormControl(moment());
   monthSelected: number = null;
   yearSelected: number = null;
   buttons: boolean[] = [false,false,false,false];

   chosenYearHandler(normalizedYear: Moment) {
     const ctrlValue = this.datePicked.value;
     ctrlValue.year(normalizedYear.year());
     this.datePicked.setValue(ctrlValue);
   }
 
   chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
     const ctrlValue = this.datePicked.value;
     ctrlValue.month(normalizedMonth.month());
     this.datePicked.setValue(ctrlValue);
     console.log(this.datePicked)
     this.yearSelected = moment(this.datePicked.value,"DD/MM/YYYY").year();
     this.monthSelected = moment(this.datePicked.value,"DD/MM/YYYY").month()+1;
     datepicker.close();
     this.getItemsByDate();
     this.calculateCategoryExpenseChartBar();
   }
   
   

  constructor(private auth : AuthService,
              private itemsService: ItemsService,
              private router: Router) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.itemsService.getItems()
                      .subscribe( items => {
                          this.items=items;
                          this.insertItems(this.items)
                      },error => this.itemExist=false);
  }


  getItemsByDate() {
    this.itemsService.getItemsByDate(this.yearSelected,this.monthSelected)
                      .subscribe( itemsByDate => {
                          this.itemsByDate=itemsByDate;
                          this.insertItemsByDate(this.itemsByDate)
                      },error => this.itemExist=false);
  }

  insertItems(items : ItemView[]){
    this.items=items;
    if(items === null){
      this.itemExist = false;
    }
    this.itemExist=true;
    this.calculateCategoryExpenseChartBar();
  }

  insertItemsByDate(itemsByDate : ItemView[]){
    this.itemsByDate=itemsByDate;
    if(this.itemsByDate.length === 0){
      this.itemsByDateExist = false;
    }else{
      this.itemsByDateExist = true;
    }
    console.log("poslje");
    console.log(this.itemsByDate)
    console.log("bool");
    console.log(this.itemsByDateExist)
  }

  insertItemsPickedDate(items : ItemView[]){
    this.itemsForPicked=items;
    if(items === null){
      this.itemExist = false;
    }
    this.itemExist=true;
    this.calculateCategoryExpenseChartBar();
  }

  calculateCategoryExpenseChartBar(){
    this.hideOther = false;
    this.hideIncome = true;
    this.hideCurrentExpense = false;
    if(this.monthSelected === null){
      var month = this.date.getMonth();
    }else{
       var month = this.monthSelected;
    }
    this.restart();
    this.items.forEach(element => {
      var tempDate = new Date (element.boughtAt);
      if(tempDate.getMonth()+1 == month){
        this.isExpenseEmpty = false;
        if(element.subcategory_id == 4){
          this.itemByCategoryList[4] +=+element.amount;
        }else if(element.subcategory_id == 5){
          this.itemByCategoryList[5] +=+element.amount;
        }else if(element.subcategory_id == 6){
          this.itemByCategoryList[6] +=+element.amount;
        }else if(element.subcategory_id == 7){        
          this.itemByCategoryList[7] +=+element.amount;
        }else if(element.subcategory_id == 8){
          this.itemByCategoryList[8] +=+element.amount;
        }else if(element.subcategory_id == 9){
          this.itemByCategoryList[9] +=+element.amount;
        }else if(element.subcategory_id == 10){
          this.itemByCategoryList[10] +=+element.amount;
        }else if(element.subcategory_id == 11){
          this.itemByCategoryList[11] +=+element.amount;        
        }
      }else{
        this.isExpenseEmpty = true;
      }
    })
    this.buttons = [true,false,false,false];
    this.plotCategoryExpense();  
  }


  

  plotCategoryExpense(){
    console.log(this.itemByCategoryList)
    var data = [{
      x: ['režije','prehrana','odijevanje','prijevoz','higijena','zdravlje','dom','slobodno vrijeme'],
      y: [this.itemByCategoryList[4], this.itemByCategoryList[5],this.itemByCategoryList[6],this.itemByCategoryList[7],this.itemByCategoryList[8],this.itemByCategoryList[9],this.itemByCategoryList[10],this.itemByCategoryList[11]],
      type: 'bar',
      marker: {
        color: '#3a2735'
      }
    }];

    var layout = {
      title: {
        text:'Odabrani mjesec potrošnja',
        font: {
          size: 24,
          color:'#3a2735',
        },
      },
      xaxis: {
        title: 'Potrošnja po kategoriji'
      },
      yaxis: {
        title: 'Iznos u kunama'
      },
        
    };
    
    Plotly.newPlot('myDivExpense', data, layout);
  }


  calculateCategoryIncomeChartBar(){

    this.hideOther = false;
    this.hideIncome = false;
    this.hideCurrentIncome = false;
    this.restart();
    if(this.monthSelected === null){
      var month = this.date.getMonth();
    }else{
       var month = this.monthSelected;
    }
    this.items.forEach(element => {
      var tempDate = new Date (element.boughtAt);
      if(tempDate.getMonth()+1 == month){
        if(element.subcategory_id == 1){
          this.itemByCategoryList[1] +=+element.amount;
       }else if(element.subcategory_id == 2){
          this.itemByCategoryList[2] +=+element.amount;
        }else if(element.subcategory_id == 3){
          this.itemByCategoryList[3] +=+element.amount;
      }
    }
  });
  
  this.buttons = [false,true,false,false];

  this.plotCategoryIncome()
  }

  plotCategoryIncome(){
    var data = [{
      x: ['redovna','povremena','ostalo'],
      y: [this.itemByCategoryList[1], this.itemByCategoryList[2],this.itemByCategoryList[3]],
      type: 'bar',
      marker: {
        color: '#3a2735'
      }
    }];

    var layout = {
      title: {
        text:'Odabrani mjesec primanja',
        font: {
          size: 24,
          color:'#3a2735',
        },
      },
      xaxis: {
        title: 'Potrošnja po kategoriji'
      },
      yaxis: {
        title: 'Iznos u kunama'
      },   
    };
    
    Plotly.newPlot('myDivIncome', data, layout);
  }



  calculateCompareExpense(){
    this.hideOther = true;
    this.restart();
    if(this.monthSelected === null){
      var month = this.date.getMonth()+1;
    }else{
       var month = this.monthSelected;
    }
    this.items.forEach(element => {
      var tempDate = new Date (element.boughtAt);
      if(element.subcategory_id ==4){
        if (tempDate.getMonth()+1 === month) {
          this.itemByCategoryList[4] += + element.amount;
        }else if (tempDate.getMonth()+1 === (month-1)){
          this.itemByCategoryLastMonthList[4] += +element.amount;
        }else if (tempDate.getMonth()+1 === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[4] +=+ element.amount;
        }
      }else if(element.subcategory_id ==5){
        if (tempDate.getMonth()+1 === month) {
          this.itemByCategoryList[5] += + element.amount;
        }else if (tempDate.getMonth()+1 === (month-1)){
          this.itemByCategoryLastMonthList[5] += +element.amount;
        }else if (tempDate.getMonth()+1 === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[5] +=+ element.amount;
        }
      }else if(element.subcategory_id ==6){
        if (tempDate.getMonth()+1 === month) {
          this.itemByCategoryList[6] += + element.amount;
        }else if (tempDate.getMonth()+1 === (month-1)){
          this.itemByCategoryLastMonthList[6] += +element.amount;
        }else if (tempDate.getMonth()+1 === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[6] +=+ element.amount;
        }
      }else if(element.subcategory_id ==7){
        if (tempDate.getMonth()+1 === month) {
          this.itemByCategoryList[7] += + element.amount;
        }else if (tempDate.getMonth()+1 === (month-1)){
          this.itemByCategoryLastMonthList[7] += +element.amount;
        }else if (tempDate.getMonth()+1 === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[7] +=+ element.amount;
        }
      }else if(element.subcategory_id ==8){
        if (tempDate.getMonth()+1 === month) {
          this.itemByCategoryList[8] += + element.amount;
        }else if (tempDate.getMonth()+1 === (month-1)){
          this.itemByCategoryLastMonthList[8] += +element.amount;
        }else if (tempDate.getMonth()+1 === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[8] +=+ element.amount;
        }
      }else if(element.subcategory_id ==9){
        if (tempDate.getMonth()+1 === month) {
          this.itemByCategoryList[9] += + element.amount;
        }else if (tempDate.getMonth()+1 === (month-1)){
          this.itemByCategoryLastMonthList[9] += +element.amount;
        }else if (tempDate.getMonth()+1 === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[9] +=+ element.amount;
        }
      }else if(element.subcategory_id ==10){
        if (tempDate.getMonth()+1 === month) {
          this.itemByCategoryList[10] += + element.amount;
        }else if (tempDate.getMonth()+1 === (month-1)){
          this.itemByCategoryLastMonthList[10] += +element.amount;
        }else if (tempDate.getMonth()+1 === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[10] +=+ element.amount;
        }
      }else if(element.subcategory_id ==11){
        if (tempDate.getMonth()+1 === month) {
          this.itemByCategoryList[11] += + element.amount;
        }else if (tempDate.getMonth()+1 === (month-1)){
          this.itemByCategoryLastMonthList[11] += +element.amount;
        }else if (tempDate.getMonth()+1 === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[11] +=+ element.amount;
        }
      }

      this.buttons = [false,false,true,false];

  });

  
  this.plotCompareExpense(month);
 
  }

  plotCompareExpense(month: number){
    var trace1 = {
      x: [month-2 + 'mj', month-1 + 'mj', month + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[4], this.itemByCategoryLastMonthList[4], this.itemByCategoryList[4]],
      type: 'bar',
      name: 'režije',
  
      marker: {
        color: '#82397f'
      }
    };
  
    var trace2 = {
      x: [month-2 + 'mj', month-1 + 'mj', month + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[5], this.itemByCategoryLastMonthList[5], this.itemByCategoryList[5]],
      type: 'bar',
      name: 'prehrana',
      marker:{
        color: '#998097'
      }
    };
  
    var trace3 = {
      x: [month-2 + 'mj', month-1 + 'mj', month + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[6], this.itemByCategoryLastMonthList[6], this.itemByCategoryList[6]],
      type: 'bar',
      name: 'odijevanje',
      marker: {
        color: '#ddbbe8'
      }
    };
    
    var trace4 = {
      x: [month-2 + 'mj', month-1 + 'mj', month + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[7], this.itemByCategoryLastMonthList[7], this.itemByCategoryList[7]],
      type: 'bar',
      name: 'prijevoz',
      marker: {
        color: '#6e567c'
      }
    };
  
    var trace5 = {
      x: [month-2 + 'mj', month-1 + 'mj', month + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[8], this.itemByCategoryLastMonthList[8], this.itemByCategoryList[8]],
      type: 'bar',
      name: 'higijena',
      marker: {
        color: '#c0a9ce'
      }
    };
  
    var trace6 = {
      x: [month-2 + 'mj', month-1 + 'mj', month + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[9], this.itemByCategoryLastMonthList[9], this.itemByCategoryList[9]],
      type: 'bar',
      name: 'zdravlje',
      marker: {
        color: '#a374bf'
      }
    };
  
    var trace7 = {
      x: [month-2 + 'mj', month-1 + 'mj', month + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[10], this.itemByCategoryLastMonthList[10], this.itemByCategoryList[10]],
      type: 'bar',
      name: 'dom',
      marker: {
        color: '#d813d1'
      }
    };
  
    var trace8 = {
      x: [month-2 + 'mj', month-1 + 'mj', month + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[11], this.itemByCategoryLastMonthList[11], this.itemByCategoryList[11]],
      type: 'bar',
      name: 'slobodno vrijeme',
      marker: {
        color: '#752672'
      }
    };
  
    var data = [trace1, trace2,trace3,trace4,trace5,trace6,trace7,trace8];
    
    var layout = {
      title: {
        text:'Usporedba potrošnje',
        font: {
          size: 24,
          color:'#3a2735',
        },
      },
      xaxis: {
        title: 'Potrošnja po mjesecima'
      },
      yaxis: {
        title: 'Iznos u kunama'
      }, 
      barmode: 'group'};
    
    Plotly.newPlot('myDiv', data,layout);
  }

  restart(){
    this.itemExpense = [];
    this.itemIncome =[];
    this.itemByCategoryList = [0,0,0,0,0,0,0,0,0,0,0];
    this.itemByCategoryLastMonthList = [0,0,0,0,0,0,0,0,0,0,0];
    this.itemByCategoryTwoMonthsAgoList = [0,0,0,0,0,0,0,0,0,0,0];   
  }

  calculateIncomeCompare(){
    this.hideOther = true;
    this.restart();
     if(this.monthSelected === null){
      var month = this.date.getMonth()+1;
    }else{
       var month = this.monthSelected;
    }
    this.items.forEach(element => {
      var tempDate = new Date (element.boughtAt);
      if(element.subcategory_id ==1){
        if (tempDate.getMonth()+1 === month) {
          this.itemByCategoryList[1] += + element.amount;
        }else if (tempDate.getMonth()+1 === (month-1)){
          this.itemByCategoryLastMonthList[1] += +element.amount;
        }else if (tempDate.getMonth()+1 === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[1] +=+ element.amount;
        }
      }else if(element.subcategory_id ==2){
        if (tempDate.getMonth()+1 === month) {
          this.itemByCategoryList[2] += + element.amount;
        }else if (tempDate.getMonth()+1 === (month-1)){
          this.itemByCategoryLastMonthList[2] += +element.amount;
        }else if (tempDate.getMonth()+1 === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[2] +=+ element.amount;
        }
      }else if(element.subcategory_id ==3){
        if (tempDate.getMonth()+1 === month) {
          this.itemByCategoryList[3] += + element.amount;
        }else if (tempDate.getMonth()+1 === (month-1)){
          this.itemByCategoryLastMonthList[3] += +element.amount;
        }else if (tempDate.getMonth()+1 === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[3] +=+ element.amount;
        }
      }
    });

    this.buttons = [false,false,false,true];

    this.plotCompareIncome(month);
  }

  plotCompareIncome(month: number){
    var trace1 = {
      x: [month-2 + 'mj', month-1 + 'mj', month + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[1], this.itemByCategoryLastMonthList[1], this.itemByCategoryList[1]],
      type: 'bar',
      name: 'redovna',
  
      marker: {
        color: '#3a2735'
      }
    };
  
    var trace2 = {
      x: [month-2 + 'mj', month-1 + 'mj', month + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[2], this.itemByCategoryLastMonthList[2], this.itemByCategoryList[2]],
      type: 'bar',
      name: 'povremena',
      marker:{
        color: '#ada3b7'
      }
    };
  
    var trace3 = {
      x: [month-2 + 'mj', month-1 + 'mj', month + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[3], this.itemByCategoryLastMonthList[3], this.itemByCategoryList[3]],
      type: 'bar',
      name: 'ostalo',
      marker: {
        color: '#82397f'
      }
    };

    var data = [trace1, trace2,trace3];
    
    var layout = {
      title: {
        text:'Usporedba primanja',
        font: {
          size: 24,
          color:'#3a2735',
        },
      },
      xaxis: {
        title: 'Primanja po mjesecima'
      },
      yaxis: {
        title: 'Iznos u kunama'
      }, 
      barmode: 'group'
    };
    
    console.log("Odabran je mjesec");
    console.log(this.monthSelected);
    console.log(month);
    Plotly.newPlot('myDiv', data,layout);
  }


  calculateIncomeCurrentMonthPie(){
    this.hideCurrentIncome = true;
    var sum = this.itemByCategoryList[1] + this.itemByCategoryList[2] + this.itemByCategoryList[3];
    var a = Math.ceil(this.itemByCategoryList[1]/sum * 100);
    var b = Math.ceil(this.itemByCategoryList[2]/sum * 100);
    var c = Math.ceil(this.itemByCategoryList[3]/sum * 100);

    var data = [{
      values: [a, b, c],
      labels: ['redovna', 'povremena', 'ostalo'],
      marker: {
        colors: ['#3a2735','#ada3b7','#82397f']
      },
      type: 'pie'
    }];

    var layout = {
      title: {
        text:'Tekući mjesec primanja',
        font: {
          size: 24,
          color:'#3a2735',
        },
      },        
    };
    
    Plotly.newPlot('myDivIncomePie', data,layout);
  }

  calculateExpenseCurrentMonthPie(){
    this.hideCurrentExpense = true;
    console.log(this.itemByCategoryList);
    console.log(this.itemByCategoryList[4]);
    var sum = this.itemByCategoryList[4] + this.itemByCategoryList[5] + this.itemByCategoryList[6] + this.itemByCategoryList[7] + this.itemByCategoryList[8] + this.itemByCategoryList[9] + this.itemByCategoryList[10];
    var a = Math.ceil(this.itemByCategoryList[4]/sum * 100); 
    var b = Math.ceil(this.itemByCategoryList[5]/sum * 100);
    var c = Math.ceil(this.itemByCategoryList[6]/sum * 100);
    var d = Math.ceil(this.itemByCategoryList[7]/sum * 100);
    var e = Math.ceil(this.itemByCategoryList[8]/sum * 100);
    var f = Math.ceil(this.itemByCategoryList[9]/sum * 100);
    var g = Math.ceil(this.itemByCategoryList[10]/sum * 100);
    var h = Math.ceil(this.itemByCategoryList[11]/sum * 100);

    var data = [{
      values: [a,b,c,d,e,f,g,h],
      labels: ['režije','prehrana','odijevanje','prijevoz','higijena','zdravlje','dom','slobodno vrijeme'],
      marker: {
        colors: ['#3a2735','#ada3b7','#82397f',' #d279d2',' #ff99ff','#e600e6', '#1a001a',' #c653c6']
      },
      type: 'pie'
    }];

    var layout = {
      title: {
        text:'Tekući mjesec potrošnja',
        font: {
          size: 24,
          color:'#3a2735',
        },
      },        
    };
    
    Plotly.newPlot('myDivExpensePie', data,layout);
  }
}