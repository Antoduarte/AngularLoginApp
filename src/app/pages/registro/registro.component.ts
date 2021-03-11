import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {userModel}   from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
recordarme:boolean=false;
Usuario:userModel;
  constructor( private auth:AuthService,
               private router:Router  ) { }

  ngOnInit() {
    this.Usuario = new userModel();
   
   }
   Onsubmit(form:NgForm){
     if(form.invalid){
       return
     }
     Swal.fire(
      {
        
        text: 'Espere por favor...',
         icon: 'info',
        allowOutsideClick: false,
        
       }
  );
  Swal.showLoading();
 this.auth.nuevoUsuario(this.Usuario)
     .subscribe(res =>{
      Swal.close();
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
     );
   }

}
