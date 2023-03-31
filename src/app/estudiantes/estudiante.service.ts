import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from './estudiante';

@Injectable({
  providedIn: 'root'
})

// aqui en el servicio es donde vamos a crear todas las llamadas para nuestra api rest
// para guardar, insertar, eliminar. Y asocia/instancia el model estudiante.ts
export class EstudianteService {

  // Vamos a darle la url que tiene el spring boot, vamos a la clase EstudianteController 
  // y alli halamos api/estudiantes y como esa aplicacion corre en http://localhost:8080
  // simplemente juntamos al url + api/estudiantes y queda http://localhost:8080/api/estudiantes
  // o en el postman con las pruebas que hicimos http://localhost:8080/api/estudiantes
  // aqui mapeamos la URL del backend http://localhost:8080/api/estudiantes y alla en spring boot 
  // que es el backend mapeamos en EstudianteController la de aqui http://localhost:4200
  // @CrossOrigin(origins = "http://localhost:4200")
  private url: string = "http://localhost:8080/api/estudiantes";

  // Inyectamos el http
  constructor(private http: HttpClient) { }

  // Metodo para conectarnos a la url, embueltos en un observable, apuntaria al metodo
  // obtener del estudianteController que devuelve una lista de tipo Estudiante
  // Obtiene los estudiantes, como el metodo desde al controller devuelve una lista aqui 
  // tambien debe retornar una lista por eso va entre [] tanto en la firma del metodo como en el 
  // retorno despues el http.get
  // https://desarrolloweb.com/articulos/practica-observables-angular.html
  // si se omite el Observable<Estudiante[] tambien trae los registros
  getAll(): Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(this.url);
  }

  // Metodo que permite crear el estudiante, o sea llama al postmapping del apirest.
  create(estudiante: Estudiante): Observable<Estudiante>{
    return this.http.post<Estudiante>(this.url, estudiante);
  }

  // Obtener un estudiante en la apirest hace referencia a obtenerEstudiante que se llama 
  // con Getmapping y asi como en el springboot en el estudianteController en el metodo
  // obtenerEstudiante pasa un integer que es el id, aqui debe ser lo mismo
  get(id: number): Observable<Estudiante>{
    return this.http.get<Estudiante>(this.url+'/'+id);
  }

  // Actualizar y va al metodo actualizarestudiante del springboot con putmapping
  // devuelve un estudiante
  update(estudiante: Estudiante): Observable<Estudiante>{
    return this.http.put<Estudiante>(this.url, estudiante);
  }

  // Eliminar vamos al eliminar del estudianteController del spring boot y alli elimina por 
  // id, aqui es lo mismo
  delete(id: number): Observable<Estudiante>{
    return this.http.delete<Estudiante>(this.url+'/'+id )
  }

}
