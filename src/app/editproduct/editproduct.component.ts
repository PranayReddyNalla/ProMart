import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryproviderService } from "../categories/categoryprovider.service";
import { ProductsDataService } from '../products-data.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent {
[x: string]: any;
categories:any;

onSubmit(){
  this.productsDataService.updateProductsData(this.EditProduct.value).subscribe((res: any)=>{
      this.productsDataService.loadProductsData().subscribe((products:any)=>{
      
     })
    }

)
}

Close(){
  this.Ref.close("Closing from function");

}

EditProduct = this.fb.group({
    id :['', Validators.required],
    title: ['', Validators.required],
    category: ['', Validators.required],
    stock: ['', Validators.required],
    brand: ['', Validators.required],
    
    
  })


  get id(){
    return this.EditProduct.get('id');
  }
  get title(){
    return this.EditProduct.get('title');
  }
  get category(){
    return this.EditProduct.get('category');
  }
  get stock(){
    return this.EditProduct.get('stock');
  }
  get brand(){
    return this.EditProduct.get('brand');
  }
  ngOnInit(): void {
    this.categoryservice.getCategories().subscribe((e:any)=>{
     this.categories=e;
   } )
   console.log(this.data)
   this.EditProduct.setValue(this.data)
 }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private Ref: MatDialogRef<EditproductComponent>,
  private productsDataService  : ProductsDataService,private fb: FormBuilder,private categoryservice :CategoryproviderService) { }

}


