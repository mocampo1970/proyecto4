import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  // Inyectamos el modal service para abrir el servicio, inyectamos la ruta para enviarlo a 
  // la ruta add-booking si no esta logeado e inyectamos tambien el servicio de autenticacion
  // lo colocamos public porque vamos a acceder desde otras partes
  constructor(
    private modalService: NgbModal,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  openLogin(){

    console.log("header.components.ts paso por openLogin")
    // Aqui con esta instrucción abro el loginComponent dinamicamente.
    this.modalService.open(LoginComponent);
  }

  // Removel el logged de localstorage o sea que se deslogea y lo redirijo
  logout(){
    console.log("header.components.ts paso por logout")

    localStorage.removeItem("logged");
    // Y lo redirijo
    this.router.navigate(['/add-booking'])
    // ejm de router con parametros:
    //router.navigate(['team', 33, 'user', 11], {relativeTo: route});  
  }

}
