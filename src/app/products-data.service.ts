import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './products/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {
   
  Id(Id: any) {
    throw new Error('Method not implemented.');
  }
  id(id: any) {
    throw new Error('Method not implemented.');
  }


  constructor(
    private http: HttpClient
  ) { }

  public loadProductsData(){
    return  this.http.get("http://localhost:3000/getProductList");
  }

  public addProductsData(product:any){
    return  this.http.post ("http://localhost:3000/addProduct",product);
  }

  public updateProductsData (product:any){
    return  this.http.post ("http://localhost:3000/updateProduct",product);
  }

  public deleteProductData(product : any){
    return this.http.post("http://localhost:3000/deleteProductList",product)

  }
  
}


