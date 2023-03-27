import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../addcategories/categories';
import { AgGridAngular } from 'ag-grid-angular';
import {ColDef, GridApi } from 'ag-grid-community';
import { ProductsDataService } from '../products-data.service';
import { HttpClient } from '@angular/common/http';
import { GridOptions } from 'ag-grid-community';
import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { CategoryproviderService } from './categoryprovider.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Array<Category> = [];
  url!: String;
  // displayedColumns: string[] = [
  //   'id',
  //   'title',
  //   'category',
  //   'stock',
  //   'brand',
  //   'price',
  //   'discountPercentage',
  // ];
 
  productList = []; 
  public columnDefs: ColDef[] = [
    
    { headerName: 'Category Name', field: 'categoryname',editable: true},
    { headerName: 'Category Code', field: 'categorycode', editable: true },
    { headerName: 'Category Description', field: 'categorydescription', editable: true },
    { headerName: 'Created By', field: 'createdby', editable: true },
    { headerName: 'Created On', field: 'createdon', editable: true },
    { headerName: 'Actions', editable: true },



    // { headerName: 'Stock', field: 'stock',editable: true },
    // { headerName: 'Brand', field: 'brand',editable: true },
    // {
    //   headerName: 'Price',
    //   field: 'price',editable: true,
    //   cellRenderer: function (params: { value: number }) {
    //     return `$${params.value}`;
    //   },
      
    // },


    // {
    //   headerName: 'Discount',
    //   field: 'discountPercentage',editable: true,
    //   cellRenderer: function (params: { value: string }) {
    //     return `${params.value}%`;
    //   },
    // },
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
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
      newRowPosition: 'Top',
    };
    
    this.toolbar = ['Add',  'Delete'];
    this.gridOptions.defaultColDef={width:100, editable:function(_params){ 
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
        _id: 0,
       
        categoryname: '',
        categorycode: 0,
        title: '',
        price: 0,
        stock: '',
      };
      this.rowData.unshift(data);
      // this.rowData.forEach((ele:any)=>{
      //   ele['id']=this.rowData.indexOf(ele)+1;
      // })
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
        } 
      }
    }
    
    
  }
  getSelectedRowData() {
    const selectedData = this.agGrid.api.getSelectedRows();
    return selectedData;
  }
}
