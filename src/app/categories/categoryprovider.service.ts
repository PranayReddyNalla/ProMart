import { Injectable } from '@angular/core';
import { Category } from '../addcategories/categories';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryproviderService {
  Categories : Array<Category>=[];
  constructor(private http : HttpClient) { }

  getCategories(){
    return this.http.get('http://localhost:3000/getcategoryList')
  }
  addcategory(c: Category){
    console.log(c)
   return  this.http.post('http://localhost:3000/addcategorytoList',c)
  }
  deletecategory(catergory : any ){
    return this.http.post('http://localhost:3000/deletecategory',catergory)

  }
}