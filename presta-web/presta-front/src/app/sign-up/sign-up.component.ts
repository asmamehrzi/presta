import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { AuthService } from '../services/auth.service';
import {UserServiceService} from '../user-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  user!: any;
  isLogin!: boolean; // false
  responseData:any;
  loginForm: FormGroup=this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router:Router,private authService: SocialAuthService
    ,private authservice: AuthService,private userservice:UserServiceService) { }
  ngOnInit(): void {
    this.authService.authState.subscribe(
      data => {
        this.isLogin = (data != null);
        this.user=data;

      }
    );
   
    }
    

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.user=data;
        this.router.navigate(['dashboard'])          }
        );
      }
      signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
          data=>{
            this.user=data;
            this.router.navigate(['dashboard'])          }
        );
      }
    

  
  signOut(): void {
    this.authService.signOut();
  }
  /*
   login(){
      this.userservice.getUsersList()
      .subscribe(res=>{
        const user=res.find((a:any)=>{
          return a.username===this.loginForm.value.username && a.password===this.loginForm.value.password
        });
        if(user){
          alert("Login Success!!");
          this.loginForm.reset();
          this.router.navigate(['dashboard'])
        }else{
          alert("user not found!!");
        }
      },err=>{
        alert("erreur")
      })
    }*/

    submit(): void {
      if(this.loginForm.valid){
      this.authservice.login(this.loginForm.value).
      subscribe(result=>{
        if(result!=null){
          console.log(result);
          AuthInterceptor.accessToken=result.accesstoken;
          localStorage.setItem('token',result.accesstoken);
          this.router.navigate(['dashboard']);
  
        }});
      
        }
        }
}
     /*  this.invalidLogin=false;
       this.loginSuccess=true;
       this.successMessage='Login successful';
       this.router.navigate(['dashboard']);
       
      }, ()=>{
        alert("erreur");
        this.invalidLogin=true;
        this.loginSuccess=false;

      });*/
 
  


 
 