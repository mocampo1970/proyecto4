import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ibusqueda } from '../interfaces/ibusqueda';

@Injectable({
  providedIn: 'root'
})
export class CochesService {

  //private url: string = "http://localhost:8080/api/estudiantes";
  private url: string = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  // Consulta y trae todas las marcas.
  marcas(): Observable<any[]>{
    return this.httpClient.get<any>(this.url + '/marca/list');
  }

  // En cochecontroller se envia post y recibe un parametro BusquedaDTO que aqui 
  // lo defini como una interfaz
  coches(busqueda: Ibusqueda): Observable<any[]>{
    console.log("cocheservice", busqueda);
    return this.httpClient.post<any>(this.url + '/coche/list', busqueda);
  }  

}
