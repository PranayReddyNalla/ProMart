import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../addcategories/categories';
import { AgGridAngular } from 'ag-grid-angular';
import {ColDef, DisplayedGroupCreator, GridApi } from 'ag-grid-community';
import { ProductsDataService } from '../products-data.service';
import { HttpClient } from '@angular/common/http';
import { GridOptions } from 'ag-grid-community';
import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { CategoryproviderService } from './categoryprovider.service';

import { MycategoriesrendererComponent } from '../mycategoriesrenderer/mycategoriesrenderer.component';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Array<Category> = [];
  url!: String;
  displayedColumns: string[] = [
    'id',
    'title',
    'category',
    'stock',
    'brand',
    'price',
    'discountPercentage',
  ];
 
  productList = [];
  public columnDefs: ColDef[] = [
    { headerName: 'Code', field: 'categorycode', editable: true ,headerCheckboxSelection: true,
    checkboxSelection: true, },
    { headerName: 'Title', field: 'categoryname',editable: true },
    { headerName: 'Description', field: 'categorydescription', editable: true},
    { headerName: 'CreatedBy', field: 'createdby',editable: true },
    { headerName: 'CreatedOn', field: 'createdon',editable: true },
  {headerName:'Actions',field:'actions',floatingFilter:false,cellRenderer:MycategoriesrendererComponent

  }
  ];

 

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
   
  };
  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10,
    infiniteInitialRowCount: 2,
  };
  public rowData: any;
  @ViewChild('agGrid')
  agGrid!: AgGridAngular;
  public editSettings: EditSettingsModel = {};
  public toolbar: ToolbarItems[] = [];
  public editType: 'fullRow' = 'fullRow';
  constructor(
    private categoryservice: CategoryproviderService
  ) {}
  ngOnInit(): void {
    this.onGridReady();
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      newRowPosition: 'Bottom',
    };
    
    this.toolbar = ['Add',  'Delete'];
    this.gridOptions.defaultColDef={width:150, editable:function(_params)
    { 
      return( true);
    },
  }
  
    this.gridOptions.singleClickEdit=false;

  }

  onGridReady() {
    this.categoryservice.getCategories().subscribe((categories: any) => {
      this.rowData = categories;
      
      console.log(this.rowData);
    });
  }

  // Example using Grid's API

  getImageUrl(f: File) {
    var reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = (event: any) => {
      this.url = event.target.result;
    };
  }
  onSelection(value: any) {
    let selectedRow :any= this.getSelectedRowData();
    if (value == 'Add') {
      let data:any = {
        categoryname: "",
        categorycode: "",
        categorydescription: "",
        active: true,
        createdby: "",
        createdon: ""
      };
      this.rowData.unshift(data);
      this.rowData.forEach((ele:any)=>{
        ele['id']=this.rowData.indexOf(ele)+1;
      })
      this.agGrid.api.setRowData(this.rowData)
      // console.log(value);
     
    } else if (value == 'Delete') {
      if(selectedRow.length >0){
        let text = "deleting selected record";
        if (confirm(text) == true) {
          selectedRow.map((data : any)=>{
            let deleteFile = this.rowData.find((d:any) => d.id == data.id );
            let deleteIndex = this.rowData.indexOf(deleteFile);
            this.rowData.splice(deleteIndex,1);
          })
        this.rowData.forEach((ele:any)=>{
          ele['id']=this.rowData.indexOf(ele)+1;
        })
        
        this.agGrid.api.setRowData(this.rowData)
        } else {
            console.log('cancel')
        }
      }
    }
    else if (value=='Edit'){
      if(selectedRow.length > 0){
        let file = this.rowData.find((d:any) => d.id == selectedRow[0].id );
        let rowInd = this.rowData.indexOf(file);
        this.agGrid.api.startEditingCell({
          rowIndex: rowInd,
          colKey: 'id', 
        })
      }
    }
    else if (value== 'Cancel')
    {
      this.agGrid.api.stopEditing();

    }
  }
  getSelectedRowData() {
    const selectedData = this.agGrid.api.getSelectedRows();
    return selectedData;
  }

}
