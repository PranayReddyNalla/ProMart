import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  visible:boolean=true
  changetype:boolean=true
  registrationform!: FormGroup;
  errormessage ={usernameerror : false, emailerror: false}
  viewpass(){
    this.visible=!this.visible
    this.changetype=!this.changetype
  }

  constructor(private _fb: FormBuilder,private http : HttpClient,private route : Router,private userservice : UserService) { }


  // registerUser(user: any){
  //   console.log(user)

    ngOnInit(){
     this.registrationform=this._fb.group({
     username:["",[Validators.required]],
     email : [" ",Validators.compose([Validators.minLength(4), Validators.required])],
      password:["",[Validators.required]]})
    }
     submission(){

      this.userservice.registeruser(this.registrationform.value).subscribe((res : any)=> {
        console.log(res);
        if(res.status==="success"){
          alert("Sucessfully registered")
          this.route.navigate(["login"])
        }
        else{
          if(res.status=="alreadyusedusername"){
             this.errormessage.usernameerror=true;
          }
          else{
            this.errormessage.emailerror=true;
          }

        }
      })


      };
     }
  

