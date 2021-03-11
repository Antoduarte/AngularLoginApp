import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { userModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userlogin:userModel;
  recuerdame:boolean = true;
  constructor(private auth:AuthService,
              private router:Router) { }

  ngOnInit() {
      
    this.userlogin = new userModel();
   
    if(localStorage.getItem('email') ){
     this.userlogin.email = localStorage.getItem('email');
     console.log(this.userlogin.email)
      this.recuerdame= true;
    }
    
 
  }
  Onsubmit(form:NgForm){
  
   
    if(form.invalid){
      return;
    }
    Swal.fire(
      {
        
        text: 'Espere por favor...',
         icon: 'info',
        allowOutsideClick: false,
        
       }
  );
  Swal.showLoading();
      this.auth.login(this.userlogin)
      .subscribe(res =>{
        Swal.close();
        if(this.recuerdame){
                             localStorage.setItem('email', this.userlogin.email)
                           }  
                  this.router.navigateByUrl('/home');
      },
(err) => {

Swal.fire(
  {
    title:'A ocurrido un Error de Autenticacion',
    text: err.error.error.message ,
     icon: 'error',
     
    
   }
);
    }
    )
  }

}
