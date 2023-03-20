import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  loginform!: FormGroup;
  errormessages = false;
  constructor(private _userprovider : UserService,private _fb:FormBuilder,private _router : Router){
  }
  ngOnInit(){

    this.loginform=this._fb.group({
      username : ['',Validators.required],
      password : ['',Validators.required]
    }
    
    
    
    )
  }
  
  async submission(){
    await this._userprovider.getusers();
    console.log(this.loginform);
    await this._userprovider.Check(this.loginform.value).subscribe((e : any)=>{
      console.log(e)
      if(e.status=='success'){
        this._userprovider.authorized=true;
        this._userprovider.user=this.loginform.value
        this._router.navigate(["home"]);
      }
      else{
       this.errormessages =true
       
      }

     })
    
    // if(this._userprovider.authorized){
    //   console.log("1");
    //   this._router.navigate(["categories"]);
    // }
    
    
  }



  



}