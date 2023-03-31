import { IBooking } from './../interfaces/ibooking';
import { Booking } from './../models/booking';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { forEach, keys, orderBy } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  // Inyectar el http
  constructor(private http: HttpClient) { }

  // Metodo para recoger los booking, nos va a devolver un observable, Obtengo las reservas de firebase
  // es como un Retrieve o una dw cuando recupera.
  getBookings(): Observable<IBooking[]> {

    // HttpHeaders Representa las opciones de configuración del encabezado para una solicitud HTTP.
    // El objeto original nunca se cambia.
    let headers = new HttpHeaders();
    // el content type es para que nos devuelva la respuesta    
    headers = headers.set('Content-type', 'application/json');

    // esta URL es de firebase cuando uno se registra y crea la base de datos el le asigna esta ruta
    // y se le adiciona al final booking.json
    const url = 'https://booking-app-1c541-default-rtdb.firebaseio.com/bookings.json';

    // aqui se capturan los datos que hay en firebase, el _.forAeach sale porque se importa el lodash    
    return this.http.get<IBooking[]>(url, { headers: headers }).pipe(
      map(data => {
        let bookings = [];
        if (data) {
          console.log("booking.service va a mostrar el data en la ste linea: ")
          console.log(data);
          // Obtengo el dia de hoy
          const today = new Date();

          // Recorro las llaves de la lista (ids firebase)
          // si tengo el forEach y saca error compilando es porque no tengo importado el lodash
          // recorro las llaves para solo filtrar las de hoy con hora actual en adelante
          forEach(keys(data), key => {
            // Creo el booking a partir del data [key], ahi vendrian el service, date y el name
            const booking = new Booking(data[key]);
            // Capturo la fecha que venga desde el booking.date
            const bookingDate = new Date(booking.date);

            // Si la fecha/hora es mayor trae los booking con push
            if (bookingDate.getTime() >= today.getTime()) {
              console.log("Mao antes del push" , booking)
              bookings.push(booking);
            }

          })
        }
        // Ordeno las reservas por fecha
        bookings = orderBy(bookings, b => b.date)
        return bookings;
      })
    )
  }

  // Metodo que le pasamos el booking que es el servicio
  addBooking(booking: Booking){

    // HttpHeaders Representa las opciones de configuración del encabezado para una solicitud HTTP.
    // El objeto original nunca se cambia.
    let headers = new HttpHeaders();
    // el content type es para que nos devuelva la respuesta
    headers     = headers.set('Content-type', 'application/json');

    // esta URL es de firebase cuando uno se registra y crea la base de datos el le asigna esta ruta
    // y se le adiciona al final booking.json
    const url = 'https://booking-app-1c541-default-rtdb.firebaseio.com/bookings.json';

    // JSON.stringify() toma un objeto de JavaScript y lo transforma en una cadena JSON. y trae datos del model
    const body = JSON.stringify(booking.getData());

    // Post inserta con la url, body y headers    
    return this.http.post(url, body, {headers: headers});

  }

}
