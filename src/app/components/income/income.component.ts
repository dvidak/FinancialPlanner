import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../auth/authentication.service";
import { Router } from "@angular/router";
import * as Plotly from "plotly.js/dist/plotly-basic.js";



@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
   Plotly: any;


  constructor(private auth : AuthService,
              private router: Router) { }

  ngOnInit() {
    var data = [{
      values: [19, 26, 55],
      labels: ['Residential', 'Non-Residential', 'Utility'],
      type: 'pie'
    }];
    
    var layout = {
      height: 400,
      width: 500
    };
    
    Plotly.newPlot('myDiv', data, layout);
  }
}
