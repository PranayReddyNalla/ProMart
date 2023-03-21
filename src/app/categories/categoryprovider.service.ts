import { Injectable } from '@angular/core';
import { Category } from '../addcategories/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryproviderService {
  Categories : Array<Category>=[];
  constructor() { }

  getCategories(){
    return this.Categories;
  }
  addcategory(c: Category){
    this.Categories.push(c);
  }
}
