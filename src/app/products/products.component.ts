import { LiveAnnouncer } from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { EditproductComponent } from '../editproduct/editproduct.component';
import { ModalpopupComponent } from '../modalpopup/modalpopup.component';
import { ProductsDataService } from '../products-data.service';
import { Product } from './product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  implements AfterViewInit{
  rowdata!: any[];
  row: any;
  element:any;
  
 
  
  openpopup( e:any ){
    this.matdialog.open(ModalpopupComponent,{width:"25%",height:"250px",backdropClass: 'custom-overlay',
    panelClass: 'custom-modalbox', 
      data:{
        Id : e.id,
        Title:e.title,
        Category:e.category,
        Stock:e.stock,
        Brand:e.brand
      }
    })
 }

 editRow(e:any){
  this.matdialog.open(EditproductComponent,{width:"23%",height:"75%"})
 }
 addrow(x:any){
  this.matdialog.open(AddproductComponent,{width:"23%",height:"75%"})
    
    }
  
  
  
 

 deleteRow(x: any){
  var delBtn = confirm(" Do you want to delete ?");
  if ( delBtn == true ) {
    this.productsDataService.deleteProductData(x).subscribe((res: any)=>{
      if(res.status=="success"){
        alert("successfully deleted")
        this.productsDataService.loadProductsData().subscribe((products:any)=>{
          this.dataSource = new MatTableDataSource(products);
          this.totalLength=this.dataSource.data.length;
         })

      }
    })
  }   
}


  displayedColumns: string[] = ['id','title'
  , 'category','stock','brand','Actions'];
  totalLength=0;
  dataSource = new MatTableDataSource<Product>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  

  constructor(private productsDataService  : ProductsDataService , private matdialog: MatDialog,private _liveAnnouncer: LiveAnnouncer){}

 

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce('Sorted ${sortState.direction}ending');
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  

  ngOnInit(): void {
    
    this.productsDataService.loadProductsData().subscribe((products:any)=>{
      this.dataSource = new MatTableDataSource(products);
      this.totalLength=this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;
     })
  }
  }


