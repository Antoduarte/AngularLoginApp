import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userModel } from '../models/usuario.model';
import {map}  from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private url:string ="https://identitytoolkit.googleapis.com/v1/accounts:";
private apiKey: string ="AIzaSyBA_euxe6TdrBzGz33pDxmuqzmqM8APwSw"
  userToken:string ="";
  constructor(private http:HttpClient) {
    this.leerToken()
   }

  loginOut(){
localStorage.removeItem('token');
  }

  login(usuario:userModel){
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken : true
    }
   return this.http.post(
     `${this.url}signInWithPassword?key=${this.apiKey}`,
      authData
   ).pipe(map(resp =>{
           this.guardarToken(resp['idToken']);
                  return resp;
    }))
  }

  nuevoUsuario(usuario:userModel){
      const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken : true
                        }
return this.http.post(
  `${this.url}signUp?key=${this.apiKey}`,
   authData
  ).pipe(map(resp =>{
         this.guardarToken(resp['idToken']);
         return resp;
  }))
  }

  private guardarToken(tokenId:string){
  this.userToken=tokenId;
  localStorage.setItem('token', tokenId);
  }
  
   leerToken(){
     if(localStorage.getItem('token')){
       this.userToken = localStorage.getItem('token');
       console.log(this.userToken)
     } else{
          
           this.userToken="";
     }
     
     return this.userToken;
     
   }

   Autentica():boolean{
    
    return this.userToken.length > 2;
     
   }
   
}

