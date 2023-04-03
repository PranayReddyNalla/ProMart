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
  this.productsDataService.updateProductsData({...this.EditProduct.value,_id:this.data.id}).subscribe((res: any)=>{
      this.productsDataService.loadProductsData().subscribe((products:any)=>{
      this.Close()
     })
    }

)
}

Close(){
  this.Ref.close("Closing from function");

}

EditProduct = this.fb.group({

  
    id :['', Validators.required],
    title: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(25)]],
    category: ['', Validators.required],
    rating:['', [Validators.required,Validators.max(5),Validators.min(1)]],
    description: ['', Validators.required],
    price: ['', [Validators.required,Validators.min(1)]],
    // image:['',Validators.required],
    stock: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
    brand: ['',[ Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    // color:['',Validators.required],
    // review:['',Validators.required],
    // vendor:['',Validators.required],
    
    
  })


  ngOnInit(): void {
    this.categoryservice.getCategories().subscribe((e:any)=>{
     this.categories=e;
   } )
   console.log(this.data)
   this.EditProduct.patchValue(this.data)
 }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private Ref: MatDialogRef<EditproductComponent>,
  private productsDataService  : ProductsDataService,private fb: FormBuilder,private categoryservice :CategoryproviderService) { }

}


