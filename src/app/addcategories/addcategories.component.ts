import { Component,OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReactiveFormsModule,FormBuilder,FormGroup, Validators} from '@angular/forms';
import {Category} from './categories';
import {TimeproviderService} from './timeprovider.service';
import { CategoryproviderService } from '../categories/categoryprovider.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-addcategories',
  templateUrl: './addcategories.component.html',
  styleUrls: ['./addcategories.component.css']
})
export class AddcategoriesComponent implements OnInit {
  category!: FormGroup;
  categories : Array<Category>=[];
  ImageFile!: File;

  time!: String;
  
 

  constructor( private _fb : FormBuilder,private _servicer : HttpClient,
    private _timeprovider : TimeproviderService,
    private _categorylist : CategoryproviderService,
    private _userprovider : UserService,
    private _router: Router){
    
  }
  onChange(event:any){
    this.ImageFile=event.target.files[0];
    console.log(this.ImageFile);
    
  }
  ngOnInit(){
    this.category=this._fb.group({
        categoryname : ["food",[Validators.required]],
        categorydescription :["this a category related to medicine",[Validators.required]],
        categorycode: ["100",[Validators.required]],
        active : [false,[Validators.required]]
    }
    )
  }
  async submission(){
    await this._timeprovider.gettime().subscribe((response: any)=> this.time = response.utc_datetime);
    console.log(this.time);
    console.log(this.category);
    this._categorylist.addcategory({...this.category.value,createdon : this.time,createdby : this._userprovider.user.username}).subscribe((e:any)=>{
      if(e.status=="success"){
         alert("Category Added")
        this._router.navigate(["categories"]);
      }
      else{
        alert("category code is not unique")
      }
    });
  }
}

