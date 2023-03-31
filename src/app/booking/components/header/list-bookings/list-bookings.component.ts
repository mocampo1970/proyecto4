import { Component, OnInit } from '@angular/core';
import { IBooking } from 'src/app/interfaces/ibooking';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/models/booking';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-bookings',
  templateUrl: './list-bookings.component.html',
  styleUrls: ['./list-bookings.component.css']
})
export class ListBookingsComponent implements OnInit {

  // Vamos a crear un arreglo con la lista de booking
  public listBookings: IBooking[];
  public loadBookings: boolean;

  // Inyectamos el servicio de booking service e inyectamos el servicio de auth para que no ingrese 
  // directamente a la pagina 
  constructor(
    private bookingService: BookingService,
    public  authService: AuthService,
    private router: Router
  ) {
    // Definimos una vble listBookings vacia inicialmente
    this.listBookings = [];
    this.loadBookings = false;
   }

  ngOnInit(): void { 

    if (this.authService.isAuthenticated) {  
      
      // Este codigo estaba solo pero lo metimos dentro del if para que solo si esta logeado entre 
      console.log("list-bookings.component ngOnInit que llama el isAuthenticated: ");        
      // Hacemos getBooking que es el metodo que trae los booking, me subscribo como para recibir 
      // los datos
      this.bookingService.getBookings().subscribe(list => {
        console.log("list-bookings.component trae la lista: " + list);      
        console.log(list);
        // Y luego a la lista se le asigna la lista que llega del subscribe
        this.listBookings = list;
        this.loadBookings = true;
      },error =>{
        console.log("no se ha podido recuperar los booking" + error),
        this.loadBookings = true;
      });

    }else{
      // Sino esta logeado lo envio a add-booking, porque solo el que este logeado 
      // puede entrar a list-booking en el anterior if.
      this.router.navigate(['/add-booking']);
    }


  
  }

}
