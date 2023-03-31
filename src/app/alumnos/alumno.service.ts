import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from './alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  // Vamos a darle la url que tiene el spring boot, vamos a la clase AlumnoController 
  // y alli halamos api/alumnos y como esa aplicacion corre en http://localhost:8080
  // simplemente juntamos al url + api/alumnos y queda http://localhost:8080/api/alumnos
  // o en el postman con las pruebas que hicimos http://localhost:8080/api/alumnos
  // aqui mapeamos la URL del backend http://localhost:8080/api/alumnos y alla en spring boot 
  // que es el backend mapeamos en AlumnoController la de aqui http://localhost:4200
  // @CrossOrigin(origins = "http://localhost:4200")
  private url: string = "http://localhost:8080/api/alumnos";

   // Inyectamos el http
  constructor(private http: HttpClient) { }

  // Metodo para conectarnos a la url, embueltos en un observable, apuntaria al metodo
  // obtener del alumnoController que devuelve una lista de tipo Alumno
  // Obtiene los alumnos, como el metodo desde al controller devuelve una lista aqui 
  // tambien debe retornar una lista por eso va entre [] tanto en la firma del metodo como en el 
  // retorno despues el http.get
  // https://desarrolloweb.com/articulos/practica-observables-angular.html
  // si se omite el Observable<Alumno[] tambien trae los registros
  getAll(): Observable<Alumno[]>{
    return this.http.get<Alumno[]>(this.url)
  }

  // Obtener un estudiante en la apirest hace referencia a obtenerEstudiante que se llama 
  // con Getmapping y asi como en el springboot en el estudianteController en el metodo
  // obtenerEstudiante pasa un integer que es el id, aqui debe ser lo mismo
  get(id: number): Observable<Alumno>{
    return this.http.get<Alumno>(this.url+'/'+id);
  }

  // Metodo que permite crear el alumno, o sea llama al postmapping del apirest.
  create(alumno: Alumno): Observable<Alumno>{

    console.log("create del alumno service", alumno)

    return this.http.post<Alumno>(this.url, alumno);
  }

 // Actualizar y va al metodo actualizaralumno del springboot con putmapping
  // devuelve un estudiante
  update(alumno: Alumno): Observable<Alumno>{
    return this.http.put<Alumno>(this.url, alumno);
  }

  // Eliminar vamos al eliminar del alumnoController del spring boot y alli elimina por 
  // id, aqui es lo mismo
  delete(id: number): Observable<Alumno>{
    return this.http.delete<Alumno>(this.url+'/'+id )
  }  


}
