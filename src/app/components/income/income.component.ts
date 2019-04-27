import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../auth/authentication.service";
import { Router } from "@angular/router";
import {ItemsService} from "../../services/item.service";
import {ItemView} from "../../models/itemView";
import * as Plotly from "plotly.js/dist/plotly-basic.js";



@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
   Plotly: any;
   date : Date = new Date();
   items: ItemView[];
   itemExist: boolean;
   itemIncome: ItemView[];
   itemExpense: ItemView[];
   itemByCategoryList: number[] = [0,0,0,0,0,0,0,0,0,0,0];
   itemByCategoryLastMonthList: number[] = [0,0,0,0,0,0,0,0,0,0,0];
   itemByCategoryTwoMonthsAgoList:  number[] = [0,0,0,0,0,0,0,0,0,0,0];

  constructor(private auth : AuthService,
              private itemsService: ItemsService,
              private router: Router) { }

  ngOnInit() {
    this.getItems();

  }

  getItems() {
    console.log(this.itemsService);
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
    this.calculateCategoryExpenseChartBar();
  }

  calculateCategoryExpenseChartBar(){
    var month = this.date.getMonth();
    this.itemByCategoryList = [0,0,0,0,0,0,0,0,0,0,0];
    this.items.forEach(element => {
      var tempDate = new Date (element.boughtAt);
      if(tempDate.getMonth() == month){
        this.sumExpense +=+element.amount;
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
      }
    })
    this.plotCategoryExpense();  
    }

  plotPieCategoryExpense(){
    var data = [{
      x: ['režije','prehrana','odijevanje','prijevoz','higijena','zdravlje','dom','slobodno vrijeme'],
      y: [this.calculatePercent[0],this.calculatePercent[1],this.calculatePercent[2],this.calculatePercent[3],this.calculatePercent[4],this.calculatePercent[5],this.calculatePercent[6],this.calculatePercent[7]],
      type: 'pie',
      marker: {
        color: '#3a2735'
      }
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
    
    Plotly.newPlot('myDiv', data, layout);

  }
  

  plotCategoryExpense(){
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
        text:'Tekući mjesec potrošnja',
        font: {
          size: 24,
          color:'#3a2735',
        },
      },  
    };
    
    Plotly.newPlot('myDiv', data, layout);
  }


  calculateCategoryIncomeChartBar(){
    this.restart();
    var month = this.date.getMonth();
    this.items.forEach(element => {
      var tempDate = new Date (element.boughtAt);
      if(tempDate.getMonth() == month){
        if(element.subcategory_id == 1){
          this.itemByCategoryList[1] +=+element.amount;
       }else if(element.subcategory_id == 2){
          this.itemByCategoryList[2] +=+element.amount;
        }else if(element.subcategory_id == 3){
          this.itemByCategoryList[3] +=+element.amount;
      }
    }
  });
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
        text:'Tekući mjesec primanja',
        font: {
          size: 24,
          color:'#3a2735',
        },
      },  
    };
    
    Plotly.newPlot('myDiv', data, layout);
  }

  calculateCompareExpense(){
    this.restart();
    var month = this.date.getMonth();
    this.items.forEach(element => {
      var tempDate = new Date (element.boughtAt);
      if(element.subcategory_id ==4){
        if (tempDate.getMonth() === month) {
          this.itemByCategoryList[4] += + element.amount;
        }else if (tempDate.getMonth() === (month-1)){
          this.itemByCategoryLastMonthList[4] += +element.amount;
        }else if (tempDate.getMonth() === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[4] +=+ element.amount;
        }
      }else if(element.subcategory_id ==5){
        if (tempDate.getMonth() === month) {
          this.itemByCategoryList[5] += + element.amount;
        }else if (tempDate.getMonth() === (month-1)){
          this.itemByCategoryLastMonthList[5] += +element.amount;
        }else if (tempDate.getMonth() === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[5] +=+ element.amount;
        }
      }else if(element.subcategory_id ==6){
        if (tempDate.getMonth() === month) {
          this.itemByCategoryList[6] += + element.amount;
        }else if (tempDate.getMonth() === (month-1)){
          this.itemByCategoryLastMonthList[6] += +element.amount;
        }else if (tempDate.getMonth() === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[6] +=+ element.amount;
        }
      }else if(element.subcategory_id ==7){
        if (tempDate.getMonth() === month) {
          this.itemByCategoryList[7] += + element.amount;
        }else if (tempDate.getMonth() === (month-1)){
          this.itemByCategoryLastMonthList[7] += +element.amount;
        }else if (tempDate.getMonth() === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[7] +=+ element.amount;
        }
      }else if(element.subcategory_id ==8){
        if (tempDate.getMonth() === month) {
          this.itemByCategoryList[8] += + element.amount;
        }else if (tempDate.getMonth() === (month-1)){
          this.itemByCategoryLastMonthList[8] += +element.amount;
        }else if (tempDate.getMonth() === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[8] +=+ element.amount;
        }
      }else if(element.subcategory_id ==9){
        if (tempDate.getMonth() === month) {
          this.itemByCategoryList[9] += + element.amount;
        }else if (tempDate.getMonth() === (month-1)){
          this.itemByCategoryLastMonthList[9] += +element.amount;
        }else if (tempDate.getMonth() === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[9] +=+ element.amount;
        }
      }else if(element.subcategory_id ==10){
        if (tempDate.getMonth() === month) {
          this.itemByCategoryList[10] += + element.amount;
        }else if (tempDate.getMonth() === (month-1)){
          this.itemByCategoryLastMonthList[10] += +element.amount;
        }else if (tempDate.getMonth() === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[10] +=+ element.amount;
        }
      }else if(element.subcategory_id ==11){
        if (tempDate.getMonth() === month) {
          this.itemByCategoryList[11] += + element.amount;
        }else if (tempDate.getMonth() === (month-1)){
          this.itemByCategoryLastMonthList[11] += +element.amount;
        }else if (tempDate.getMonth() === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[11] +=+ element.amount;
        }
      }
  });

  this.plotCompareExpense(month);
 
  }

  plotCompareExpense(month: number){
    var trace1 = {
      x: [month-1 + 'mj', month + 'mj', month+1 + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[4], this.itemByCategoryLastMonthList[4], this.itemByCategoryList[4]],
      type: 'bar',
      name: 'režije',
  
      marker: {
        color: '#3a2735'
      }
    };
  
    var trace2 = {
      x: [month-1 + 'mj', month + 'mj', month+1 + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[5], this.itemByCategoryLastMonthList[5], this.itemByCategoryList[5]],
      type: 'bar',
      name: 'prehrana',
      marker: {
        color: 'blue'
      }
    };
  
    var trace3 = {
      x: [month-1 + 'mj', month + 'mj', month+1 + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[6], this.itemByCategoryLastMonthList[6], this.itemByCategoryList[6]],
      type: 'bar',
      name: 'odijevanje',
      marker: {
        color: 'yellow'
      }
    };
    
    var trace4 = {
      x: [month-1 + 'mj', month + 'mj', month+1 + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[7], this.itemByCategoryLastMonthList[7], this.itemByCategoryList[7]],
      type: 'bar',
      name: 'prijevoz',
      marker: {
        color: 'green'
      }
    };
  
    var trace5 = {
      x: [month-1 + 'mj', month + 'mj', month+1 + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[8], this.itemByCategoryLastMonthList[8], this.itemByCategoryList[8]],
      type: 'bar',
      name: 'higijena',
      marker: {
        color: 'red'
      }
    };
  
    var trace6 = {
      x: [month-1 + 'mj', month + 'mj', month+1 + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[9], this.itemByCategoryLastMonthList[9], this.itemByCategoryList[9]],
      type: 'bar',
      name: 'zdravlje',
      marker: {
        color: 'purple'
      }
    };
  
    var trace7 = {
      x: [month-1 + 'mj', month + 'mj', month+1 + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[10], this.itemByCategoryLastMonthList[10], this.itemByCategoryList[10]],
      type: 'bar',
      name: 'dom',
      marker: {
        color: 'black'
      }
    };
  
    var trace8 = {
      x: [month-1 + 'mj', month + 'mj', month+1 + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[11], this.itemByCategoryLastMonthList[11], this.itemByCategoryList[11]],
      type: 'bar',
      name: 'slobodno vrijeme',
      marker: {
        color: 'grey'
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
      barmode: 'group'};
    
    Plotly.newPlot('myDiv', data,layout);
  }

  restart(){
    this.itemByCategoryList = [0,0,0,0,0,0,0,0,0,0,0];
    this.itemByCategoryLastMonthList = [0,0,0,0,0,0,0,0,0,0,0];
    this.itemByCategoryTwoMonthsAgoList = [0,0,0,0,0,0,0,0,0,0,0];
  }

  calculateIncomeCompare(){
    this.restart();
    var month = this.date.getMonth();
    this.items.forEach(element => {
      var tempDate = new Date (element.boughtAt);
      if(element.subcategory_id ==1){
        if (tempDate.getMonth() === month) {
          this.itemByCategoryList[1] += + element.amount;
        }else if (tempDate.getMonth() === (month-1)){
          this.itemByCategoryLastMonthList[1] += +element.amount;
        }else if (tempDate.getMonth() === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[1] +=+ element.amount;
        }
      }else if(element.subcategory_id ==2){
        if (tempDate.getMonth() === month) {
          this.itemByCategoryList[2] += + element.amount;
        }else if (tempDate.getMonth() === (month-1)){
          this.itemByCategoryLastMonthList[2] += +element.amount;
        }else if (tempDate.getMonth() === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[2] +=+ element.amount;
        }
      }else if(element.subcategory_id ==3){
        if (tempDate.getMonth() === month) {
          this.itemByCategoryList[3] += + element.amount;
        }else if (tempDate.getMonth() === (month-1)){
          this.itemByCategoryLastMonthList[3] += +element.amount;
        }else if (tempDate.getMonth() === (month-2)){
          this.itemByCategoryTwoMonthsAgoList[3] +=+ element.amount;
        }
      }
    });

    this.plotCompareIncome(month);
  }

  plotCompareIncome(month: number){
    var trace1 = {
      x: [month-1 + 'mj', month + 'mj', month+1 + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[1], this.itemByCategoryLastMonthList[1], this.itemByCategoryList[1]],
      type: 'bar',
      name: 'redovna',
  
      marker: {
        color: '#3a2735'
      }
    };
  
    var trace2 = {
      x: [month-1 + 'mj', month + 'mj', month+1 + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[2], this.itemByCategoryLastMonthList[2], this.itemByCategoryList[2]],
      type: 'bar',
      name: 'povremena',
      marker: {
        color: 'blue'
      }
    };
  
    var trace3 = {
      x: [month-1 + 'mj', month + 'mj', month+1 + 'mj'],
      y: [this.itemByCategoryTwoMonthsAgoList[3], this.itemByCategoryLastMonthList[3], this.itemByCategoryList[3]],
      type: 'bar',
      name: 'ostalo',
      marker: {
        color: 'yellow'
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
      barmode: 'group'};
    
    Plotly.newPlot('myDiv', data,layout);
  }
}
