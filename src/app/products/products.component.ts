import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { EditproductComponent } from '../editproduct/editproduct.component';
import { ModalpopupComponent } from '../modalpopup/modalpopup.component';
import { ProductsDataService } from '../products-data.service';
import { UserService } from '../user/user.service';
import { Product } from './product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements AfterViewInit {
  rowdata!: any[];
  row: any;
  element: any;
  isfav = true;
  p: any;
  f: any;
  ds =[];


  Addfav(eleobj:any){ 
    forkJoin  
    eleobj.is_favourite=!eleobj.is_favourite
    console.log(eleobj)
    this.productsDataService.updateProductsData(eleobj).subscribe((res : any)=>{
      if(res.status="success"){

      //   if(!eleobj.is_favourite){
      //  // alert('do you want add as favourite?');
      //  eleobj.is_favourite=true;
      //   }
      //   else{
      //   //  alert('do you want remove as favourite?')
    
      //   eleobj.is_favourite=false;
      //   }
      }
    })

  }
  
  

  openpopup(e: any) {
    this.matdialog.open(ModalpopupComponent, {
      width: '25%',
      height: '250px',
      backdropClass: 'custom-overlay',
      panelClass: 'custom-modalbox',
      data: {
        Id: e.id,
        Title: e.title,
        Category: e.category,
        Stock: e.stock,
        Brand: e.brand,
      },
    });
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  editRow(e: any) {
    this.matdialog.open(EditproductComponent, {
      width: '23%',
      height: '75%',
      backdropClass: 'custom-overlay',
      panelClass: 'custom-modalbox',
      data: {
        id: e.id,
        title: e.title,
        category: e.category,
        stock: e.stock,
        brand: e.brand,
      },
    });
  }
  addrow(x: any) {
    this.matdialog.open(AddproductComponent, { width: '23%', height: '75%' });
  }

//   removeSelectedRows() {
//     this.selection.selected.forEach(item => {
//      let index: number = this.data.findIndex(d => d === item);
//      console.log(this.data.findIndex(d => d === item));
//      this.dataSource.data.splice(index,1);

//      this.dataSource = new MatTableDataSource<Product>(this.dataSource.data);
//    });
//    this.selection = new SelectionModel<Product>(true, []);
//  }

  deleteRow(x: any) {
    var delBtn = confirm(' Do you want to delete ?');
    if (delBtn == true) {
      this.productsDataService.deleteProductData(x).subscribe((res: any) => {
        if (res.status == 'success') {
          alert('successfully deleted');
          this.productsDataService
            .loadProductsData()
            .subscribe((products: any) => {
              this.dataSource = new MatTableDataSource(products);
              this.totalLength = this.dataSource.data.length;
            });
        }
      });
    }
  }

  displayedColumns: string[] = [
    'select',
    'id',
    'title',
    'category',
    'stock',
    'brand',
    'Actions',
  ];
  data = Object.assign;
  totalLength = 0;
  dataSource = new MatTableDataSource<Product>([]);
  selection = new SelectionModel<Product>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  constructor(
    private productsDataService: ProductsDataService,
    private matdialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    public userService: UserService
  ) { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce('Sorted ${sortState.direction}ending');
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    const products=this.productsDataService.loadProductsData()
    const favlist=this.productsDataService.getfavProductsData({
      "_id": {
        "$oid": "63f3a0e8124d687ac8ed0d26"
      },
      "username": "charitha",
      "email": "charitha@gmail.com",
      "password": "7777978777"
    })

    forkJoin([products,favlist]).subscribe(result =>{
    this.p =result[0];
      this.f = result[1];

      console.log(this.p)
      console.log(this.f)

      // this.p.map(e =>{
      //  if(this.f.includes(e.id)){
        

      // }

      // })
    })
    this.productsDataService.loadProductsData().subscribe((products: any) => {
      this.dataSource = new MatTableDataSource(products);
      this.totalLength = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;
    });
  }
}
