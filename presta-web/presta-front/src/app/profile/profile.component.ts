import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!:any;



  constructor(private authservice:AuthService,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.http.get(`${environment.endpoint}/profile`).subscribe
    (res => {
    this.user=res;
    console.log(this.user.username)
    console.log(this.user.email)
    console.log(this.user.password)

  });
    
      
  }

}