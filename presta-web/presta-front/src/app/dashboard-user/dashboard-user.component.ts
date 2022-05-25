import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  title = 'admin-panel-layout';
  sideBarOpen = true;
  user:any;
  
  constructor(private http: HttpClient,private router: Router,private userService : UserServiceService

    ) { }

  ngOnInit(): void {
   this.http.get('http://localhost:8080/users/profile')

   .subscribe(result=>{
     this.user=result;
      console.log(this.user.username);
      
    //return result.toString;
        });
       
      /*  this.userService.getUsersList()
        .subscribe(res=>{
          const user=res.find((a:any)=>{
            return a.username && a.password;
          });
          if(user){
            alert("Login Success!!");
          }else{
            alert("user not found!!");
          }
        },err=>{
          alert("erreur")
        }) */
      }
  
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
