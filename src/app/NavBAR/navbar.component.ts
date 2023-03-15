import { Component } from '@angular/core';
import { UserService } from '../user/user.service';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  title = "ProMart"
  auth: boolean=true;;

  constructor(public userService:UserService){
    console.log(this.userService)
    
  }
  ngOnInit(){
    

}
submit(e: any){
  console.log(e);
  this.userService.logout();
}

}