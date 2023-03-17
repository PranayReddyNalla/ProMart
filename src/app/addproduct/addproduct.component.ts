import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsDataService } from '../products-data.service';
import { CategoryproviderService } from "../categories/categoryprovider.service"

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {
  dataSource: any;
  totalLength: any;
  element:any;
  form: any;
  categories!: any[];



  Close(){
    this.Ref.close("Closing from function");
  
  }

  onSubmit(){
    
    this.productsDataService.addProductsData(this.AddProduct.value).subscribe((res: any)=>{
      
      this.productsDataService.loadProductsData().subscribe((products:any)=>{
        this.dataSource = new MatTableDataSource(products);
        this.totalLength=this.dataSource.data.length;
       })
      }

  )
  }

  AddProduct = this.fb.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    category: ['', Validators.required],
    stock: ['', Validators.required],
    brand: ['', Validators.required],
    
    
  })

  ngOnInit(): void {
   this.categoryservice.getCategories().subscribe((e:any)=>{
    this.categories=e;

   }
    
   )
  }
  constructor(private productsDataService  : ProductsDataService ,private Ref: MatDialogRef<AddproductComponent>,
     private matdialog: MatDialog,private fb: FormBuilder,private categoryservice : CategoryproviderService) { }




}
