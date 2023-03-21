import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'productsMart';
  constructor(private _userprovider : UserService,private _router : Router){

  }



  ngOnInit(): void {
        this._userprovider.authorized=true;
        this._userprovider.user={username : "Mouli",password : "12345678"}
        this._router.navigate(["home"]);
        this._userprovider.getuser();
      }
    
  
  

}
