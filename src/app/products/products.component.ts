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
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
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
  ds : any[] = [];
  selecteditems : any[] = [];
  len=0;


  
deletemany(){
  this.productsDataService.deletemanyfromProductList(this.selecteditems).subscribe((e: any)=>{
    if(e.status=="success"){
      this.Reload()
    }
  })


}
  Addfav(eleobj:any){ 
    console.log(eleobj)
    if(!eleobj.is_favourite){
      const dialogRef=this.matdialog.open(ConfirmationDialogComponent,{
        data : {
          message : " Do you want to add this to your Favourite??",
          buttonText : { ok : "Add",cancel : "Cancel"}
      }})
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
        this.productsDataService.addProductstoFavList(
          {userId : this.userService.UserObject._id,
            productId : eleobj._id}
        ).subscribe((e : any)=>{
          console.log(e)
          if(e.status=="success"){
            this.Reload()
            
          }
        })
      }
    })
  }
     else{
      const dialogRef=this.matdialog.open(ConfirmationDialogComponent,{
        data : {
          message : " Do you want to remove this from your Favourites??",
          buttonText : { ok : "Remove",cancel : "Cancel"}
      }})
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
      this.productsDataService.deleteProductfromFavList({userid : this.userService.UserObject._id,productid : eleobj._id}).subscribe((e : any)=>{
        console.log(e)
        eleobj.is_favourite=false;
      })
    }})
    }
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
        this.dataSource.data.forEach(row =>{
         this.selecteditems.push(row)
         this.selection.select(row)
        });
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
    this.matdialog.open(AddproductComponent, { width: '23%', height: '95%' });
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
    const dialogRef=this.matdialog.open(ConfirmationDialogComponent,{
    data : {
      message : " Do you want to delete??",
      buttonText : { ok : "Delete",cancel : "Cancel"}
  }})
  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed) {
      this.productsDataService.deleteProductData(x).subscribe((res: any) => {
        if (res.status == 'success') {
          alert('successfully deleted');
          this.Reload()
        }
      });
    }
  })
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
  ngOnInit(){
    this.Reload();
  }

  Reload(): void {
    console.log(this.userService.UserObject)
    const products=this.productsDataService.loadProductsData()
    const favlist=this.productsDataService.getfavProductsData(this.userService.UserObject)

    forkJoin([products,favlist]).subscribe((result : any) =>{
    this.p =result[0];
      this.f = result[1].map((e:any)=>{
        return e.productId
      })
    

      console.log(this.p)
      console.log(this.f)

    this.ds=[]
      this.p.map( (e : any) => {
        if(e.is_status){
        if(this.f.includes(e._id)){
          this.ds.push({...e,is_favourite: true})
        }
        else{
          this.ds.push({...e,is_favourite: false})

        }
      }


      })
      console.log(this.ds)
      this.dataSource = new MatTableDataSource(this.ds);
      this.totalLength = this.dataSource.data.length;
      // this.dataSource.paginator = this.paginator;
    }
    )
  }

addtoselected(event : any,element :any ){
  console.log(event.checked)
  if(event.checked){
    
    this.selecteditems.push(element._id)
    console.log(this.selecteditems)

  }
  else{
    const index=this.selecteditems.findIndex(e => {return (e==element)})
    this.selecteditems.splice(index,1)

  }
  

}
}
