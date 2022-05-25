import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { Router } from '@angular/router';
 


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
private endpoint='http://localhost:8080/users';
private loginUrl='http://localhost:8080/api/login';

  constructor(private http:HttpClient,private router:Router) {
  }

  login(data:any):Observable<any> {
    return this.http.post(`${this.loginUrl}`, data);
      
    }
  
   
 

  }