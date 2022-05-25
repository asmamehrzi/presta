import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user!: User;
  isLogin!: boolean; // false
  constructor(private authservice: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authservice.login(this.user).subscribe(
      data => {
        this.isLogin = (data != null);
        this.user=data;
        console.log(this.user.username);
        console.log(this.user.password);
      //  this.user = data;
        //console.log(this.user.username);
        //console.log(this.user.password);
             }

        ) ;
      }

  }


