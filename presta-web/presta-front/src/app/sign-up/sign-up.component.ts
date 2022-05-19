import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { first } from 'rxjs';
import { AuthLoginInfo } from '../model/login-info';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../token/token-storage.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  user!: any;
  errorMessage='';
  isLoginFailed=false;
  isLogin!: boolean; // false
  loginForm: FormGroup=this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router:Router,private authService: SocialAuthService
    ,private authservice: AuthService, private tokenStorage:    TokenStorageService) { }
  ngOnInit(): void {
    this.authService.authState.subscribe(
      data => {
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
  
   /*login(){
      this.userService.getUsersList()
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
 onSubmit(){
   this.authservice.login(this.loginForm.value.username,this.loginForm.value.password)
  . pipe(first()).subscribe(
     (data: any) =>{
       this.isLoginFailed=false;
       this.router.navigate(['dashboard'])
      },(Error: any)=>{
        alert("erreur");
        this.isLoginFailed=true;

      })
 }
  
      }



