import { Component, OnInit } from '@angular/core';
import {ItemsService} from "../../services/item.service";
import {ItemView} from "../../models/itemView";
import {MatDialog } from "@angular/material";

import { AddItemModalComponent} from "../add-item-modal/add-item-modal.component"



@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: ItemView[];
  itemExist: boolean;
  hide: boolean;
  p: number = 1;


  constructor(private itemsService: ItemsService,
              public dialog: MatDialog) { }

  ngOnInit() {
    console.log("dohvacam");
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
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddItemModalComponent, {
      width: '500px',
    });
    console.log("Ušao")
  }

}
