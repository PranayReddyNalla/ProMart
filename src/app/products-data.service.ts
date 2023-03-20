import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './products/product';
import { UserService } from './user/user.service';
import { Observable, of } from 'rxjs';

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
    private http: HttpClient,
    private userservice : UserService
  ) { }

  public loadProductsData(){

    return  this.http.get("http://localhost:3000/getProductList");
    
  }

  public addProductsData(product:any){
    return  this.http.post ("http://localhost:3000/addProduct",product);
  }
  public updateProductsData(product:any){
    return  this.http.post ("http://localhost:3000/updateProduct",product);
  }

  public deleteProductData(product : any){
    return this.http.post("http://localhost:3000/deleteProductList",product)
}

  

public getfavProductsData(user : any) : Observable<any>{
  return this.http.post("http://localhost:3000/getfavouriteList",user)
}
public addProductstoFavList(product:any) : Observable<any> {
  return  this.http.post ("http://localhost:3000/addtofavouriteList",product);
    //  this.getfavProductsData(this.userservice.UserObject).subscribe((e:any) =>{
    //   if(e.length<5){
    //     return  this.http.post ("http://localhost:3000/addtofavouriteList",product);
    //   }
    //  else{
    //   const Observable = of({status : "exceeded"})
    //   return Observable;
    //  }
    // })
    
    
}
public deleteProductfromFavList(favproduct:any){
  return  this.http.post ("http://localhost:3000/removefromfavouriteList",favproduct);
}
}


