import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-mycategoriesrenderer',
  templateUrl: './mycategoriesrenderer.component.html',
  styleUrls: ['./mycategoriesrenderer.component.css']
})
export class MycategoriesrendererComponent implements OnInit, ICellRendererAngularComp {
  private params: any;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params=params
    console.log(params)
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
   return false;
  }
  handleClickEvent(event:any) {
    this.params.clicked(this.params.value);
  } 

  edit(event:any){
    this.params.api.startEditingCell({
      rowIndex: this.params.node.rowIndex,
      colKey: 'categorycode', 
    
    })
    
  }
update(event:any){

}
  
  cancel(event:any){
  this.params.api.stopEditing(true);
}
  constructor(){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

}
