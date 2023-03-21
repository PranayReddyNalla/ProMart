import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../addcategories/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryproviderService {
  constructor(private http : HttpClient){}
  getCategories(){
    return this.http.get("http://localhost/3000/getcategoryList")
  }
  public loadProductsData(){
     return this.http.get("https://dummyjson.com/products")

}
}
