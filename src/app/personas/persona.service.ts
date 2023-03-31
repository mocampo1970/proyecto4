import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from './persona';

@Injectable({
  providedIn: 'root'
})

// aqui en el servicio es donde vamos a crear todas las llamadas para nuestra api rest
// para guardar, insertar, eliminar. Y asocia/instancia el model persona.ts
export class PersonaService {

  // Vamos a darle la url que tiene el spring boot, vamos a la clase PersonaController 
  // y alli halamos api/personas y como esa aplicacion corre en http://localhost:8080
  // simplemente juntamos al url + api/personas y queda http://localhost:8080/api/personas
  // o en el postman con las pruebas que hicimos http://localhost:8080/api/personas
  // aqui mapeamos la URL del backend http://localhost:8080/api/personas y alla en spring boot 
  // que es el backend mapeamos en PersonaController la de aqui http://localhost:4200
  // @RestController
  // @RequestMapping("/api/personas")
  private url: string="http://localhost:8080/api/personas";

  // Inyectamos el http
  constructor(private httpClient: HttpClient) { }

  // Metodo para conectarnos a la url, embueltos en un observable, apuntaria al metodo
  // obtener del personaController que devuelve una lista de personas
  // Obtiene las personas, como el metodo desde al controller devuelve una lista aqui 
  // tambien debe retornar una lista por eso va entre [] tanto en la firma del metodo como en el 
  // retorno despues el httpClient.get, aqui acabe de probar el 
  // getAll() { -> asi sin retornar observable y tambien funciona.
  getAll(): Observable<Persona[]>{
    return this.httpClient.get<Persona[]>(this.url);
  }

  // Metodo que permite crear la persona, o sea llama al postmapping del apirest.  
  create(persona: Persona): Observable<Persona>{
    return this.httpClient.post<Persona>(this.url, persona);
  }

  // Actualizar y va al metodo actualizarpersona del springboot con putmapping
  // devuelve una persona
  update(persona: Persona): Observable<Persona>{
    return this.httpClient.put<Persona>(this.url, persona);
  }

  // Metodo para eliminar
  delete(id: number): Observable<Persona>{
    return this.httpClient.delete<Persona>(this.url + '/'+id);
  }


}
