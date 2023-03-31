import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { find } from 'lodash-es';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  /**
   * Compruebo si el login es correcto
   * @param infoLogin 
   */
  login(infoLogin: any): Observable<boolean> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');

    // IMPORTANTE: por temas de seguridad, se deshabilitara esta ruta, crea tu propio proyecto firebase
    const url = 'https://booking-app-1c541-default-rtdb.firebaseio.com/users.json';

    return this.http.get<boolean>(url, { headers: headers }).pipe(
      map(users => {

        // Busco el usuario
        const user = find(users, u => u.user === infoLogin.user && u.pass == infoLogin.pass);

        // Si existe, lo indico
        if (user) {
          return true;
        }

        return false;
      })
    )

  }

  /**
   * Indico si el usuario esta o no logueado por el localstorage
   * lo que hace es guardar en memoria en cache en cookies si esta logeado o no
   */
  isAuthenticated(){
    console.log("auth.service entro a isAuthenticated")
    return localStorage.getItem("logged");
  }

}
