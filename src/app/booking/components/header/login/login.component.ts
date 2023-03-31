import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Creamos el fromGroup
  public formLogin: FormGroup;
  //Creamos 2 vbles para saber si ok o error en el login
  public showLoginSuccess: boolean;
  public showLoginError: boolean;

  // se inyecta activeModal para utilizarlo en el html para cerrar la ventana
  // e inyectamos el formBuilder, 
  // y adicional inyectamos el servicio authService, que es el que va a validar el usuario y password.
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    this.formLogin = this.formBuilder.group({
      user: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required)
    })

    // Inicializo vbles en false
    this.showLoginSuccess = false;
    this.showLoginError   = false;
  }

  ngOnInit(): void {
  }

  // Aqui chequeamos el login
  checkLogin(){

    // cada que valide inicializo
    this.showLoginSuccess = false;
    this.showLoginError   = false;

    this.authService.login(this.formLogin.value).subscribe(success =>{
      console.log("Login.component Se logio correctamente: " + success);

      if (success) {
        this.showLoginSuccess = true;
        // Cuando se logee bien abrimos la vista/ventana list-bookings se escribe el selector del html
        this.router.navigate(['/list-bookings']);
        
        // asignamos una marca a localstorage 
        // esto esta La propiedad de sólo lectura localStorage te permite acceder al objeto local Storage; 
        // los datos persisten almacenados entre de las diferentes sesiones de navegación.
        localStorage.setItem("logged", "1");

        // Cerrar el modal
        this.activeModal.close();
        
      } else {
        console.log("Login.component NO se logio correctamente: " + success);        
        this.showLoginError   = true;        
      }

    });
  }

}
