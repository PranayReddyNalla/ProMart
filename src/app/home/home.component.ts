import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { UserService } from '../user/user.service';
import { ProductsDataService } from '../products-data.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  favproductsdata : any[]=[]
  @ViewChild(MatAccordion)
  accordion !: MatAccordion;

  constructor(public userService:UserService,public productsDataService: ProductsDataService){}

  ngOnInit(){
    const products=this.productsDataService.loadProductsData()
    const favlist=this.productsDataService.getfavProductsData(this.userService.UserObject)

    forkJoin([products,favlist]).subscribe((result : any) =>{
    const p =result[0];
    const f = result[1].map((e:any)=>{
         console.log(e)
        return e.productId
      })

      console.log(p)
      console.log(f)
      p.map( (e : any) => {
        if(f.includes(e._id)){
          this.favproductsdata.push(e)
        }
  })
  console.log(this.favproductsdata)
})
  }
}