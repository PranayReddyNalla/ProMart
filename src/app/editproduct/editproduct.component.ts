import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsDataService } from '../products-data.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent {
dataSource: any;
  totalLength: any;

onSubmit(){
  this.productsDataService.updateProductsData(this.EditProduct.value).subscribe((res: any)=>{
      
    this.productsDataService.loadProductsData().subscribe((products:any)=>{
      this.dataSource = new MatTableDataSource(products);
      this.totalLength=this.dataSource.data.length;
     })
    }

)
}

Close(){
  this.Ref.close("Closing from function");
}

EditProduct = this.fb.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    category: ['', Validators.required],
    stock: ['', Validators.required],
    brand: ['', Validators.required],
    
    
  })

  constructor(private fb: FormBuilder,private matdialog: MatDialog,private productsDataService  : ProductsDataService, private Ref: MatDialogRef<EditproductComponent>) { }

}


