import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proveedor } from './proveedor';

@Injectable({
  providedIn: 'root'
})

// aqui en el servicio es donde vamos a crear todas las llamadas para nuestra api rest
// para guardar, insertar, eliminar. Y asocia/instancia el model proveedor.ts
export class ProveedorService {

  // Vamos a darle la url que tiene el spring boot, vamos a la clase ProveedorController 
  // y alli halamos api/proveedores y como esa aplicacion corre en http://localhost:8080
  // simplemente juntamos al url + api/proveedores y queda http://localhost:8080/api/proveedores
  // o en el postman con las pruebas que hicimos http://localhost:8080/api/estudiantes
  // aqui mapeamos la URL del backend http://localhost:8080/api/estudiantes y alla en spring boot 
  // que es el backend mapeamos en EstudianteController la de aqui http://localhost:4200
  // @CrossOrigin(origins = "http://localhost:4200")  
  private url: string = "http://localhost:8080/api/proveedores"; 
   
  // Url obtenida de la variable de enviroments, esta seria la forma ideal para no tener que 
  // declarar en cada servicio la url de trabajo y en cada servicio se anexaria la parte por ejm
  // aqui en proveedores api/proveedores
  baseUrl = environment.baseUrl;

  // Inyectamos el http
  constructor(private httpClient: HttpClient) { }

  // Metodo para conectarnos a la url, embueltos en un observable, apuntaria al metodo
  // obtener del proveedorController que devuelve una lista de tipo Proveedor
  // Obtiene los proveedores, como el metodo desde al controller devuelve una lista aqui 
  // tambien debe retornar una lista por eso va entre [] tanto en la firma del metodo como en el 
  // retorno despues el http.get
  // https://desarrolloweb.com/articulos/practica-observables-angular.html
  getAll(): Observable<Proveedor[]>{
    return this.httpClient.get<Proveedor[]>(this.url);
  }  

  // Metodo que permite crear el proveedor, o sea llama al postmapping del apirest, 
  // tener en cuenta el upload de la imagen
  create(proveedor: Proveedor): Observable<Proveedor>{
    return this.httpClient.post<Proveedor>(this.baseUrl, proveedor);
  }

}
