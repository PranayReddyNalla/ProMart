import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { CheckboxControlValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: User;
  users: Array<User>=[]
  authorized : boolean = false;
  client : any;
  UserObject :any

  




  constructor(private http : HttpClient){
    // const { MongoClient } = require("mongodb");
    //  const uri ="mongodb+srv://user:root@cluster0.7h4sn3h.mongodb.net/?retryWrites=true&w=majority";
    //   this.client = new MongoClient(uri);
  }



  async login(u : User){
    // await this.getusers();
    // const filteredusers=this.users.filter((e)=>{ return (e.username==u.username && e.password==u.password)});
    // console.log(filteredusers);
    // if(filteredusers.length>0){
    //   this.authorized=true;
    //   this.user={username : filteredusers[0].username,password : filteredusers[0].password};
    // }
    this.Check(u).subscribe((e : any)=>{
     if(e.status=='success'){
       
     }
    })
  }
  getuser(){
    this.http.post("http://localhost:3000/getuser",this.user).subscribe((e : any)=>{
      this.UserObject=e
      console.log(e)
    })
    
  }
  async getusers(){
    // await this.registeruser().subscribe((data: any)=>{
    //   data.forEach((element:any) => { this.users.push({username: element.username,password: element.password })
        
    //   });
    //   console.log(this.users);
    // });

  }


  logout()
{
  this.user={username : "", password : " "};
  this.authorized=false;
}
  registeruser(userdata : any){
    console.log("posted");
    return this.http.post('http://localhost:3000/adduser',userdata);
  }
  //  async finduser(){
  //     try {
  //       const database = this.client.db('Promart');
  //       const users = database.collection('est');
  //     const query = { username: 'Mouli' };
  //       const user = await users.findOne(query);
    
  //       console.log(user);
  //     } finally {
  //       // Ensures that the client will close when you finish/error
  //       await this.client.close();
  //     }
  //   }
  Check(u : User){
    return this.http.post('http://localhost:3000/loginuser',{username : u.username,password : u. password})
  }
      
  }


    
  