import { Component, OnInit } from '@angular/core';
import { Category } from '../addcategories/categories';
import { CategoryproviderService } from './categoryprovider.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Array<Category>=[];
  url!: String;
  displayedColumns: string[] = ['id','title', 'category','stock','brand','action']



  constructor(private _categorylistprovider : CategoryproviderService){
  }
  async ngOnInit(){
    this._categorylistprovider.getCategories().subscribe((category : any)=>{
      console.log(category)
      this.categories=[...category]
      console.log(this.categories);

    })
  }

  delete(c : any){
    console.log("1")
    this._categorylistprovider.deletecategory(c).subscribe((e: any)=>{
      alert(e.status)

    })
    
  } 
  // getImageUrl(f :File ){
    
  //   console.log("1");
  //   var reader=new FileReader();
  //   reader.readAsDataURL(f);
  //   reader.onload=(event : any) =>{
  //         this.url=event.target.result;
  //   }
  // }
  

}