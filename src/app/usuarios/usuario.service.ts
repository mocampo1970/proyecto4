import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // Vamos a darle la url que tiene el spring boot, vamos a la clase UsuarioController 
  // y alli halamos api/usuarios y como esa aplicacion corre en http://localhost:8080
  // simplemente juntamos al url + api/usuarios y queda http://localhost:8080/api/usuarios
  // o en el postman con las pruebas que hicimos http://localhost:8080/api/usuarios
  // aqui mapeamos la URL del backend http://localhost:8080/api/usuarios y alla en spring boot 
  // que es el backend mapeamos en UsuarioController la de aqui http://localhost:4200
  // @RestController
  // @RequestMapping("/api/usuarios")
  private url: string="http://localhost:8080/api/usuarios";

  // Inyectamos el http
  constructor(private http: HttpClient) { }

  // Metodo para conectarnos a la url, embueltos en un observable, apuntaria al metodo
  // obtener del usuarioController que devuelve una lista de usuarios
  // Obtiene las personas, como el metodo desde al controller devuelve una lista aqui 
  // tambien debe retornar una lista por eso va entre [] tanto en la firma del metodo como en el 
  // retorno despues el httpClient.get, aqui acabe de probar el 
  // getAll() { -> asi sin retornar observable y tambien funciona.  
  getAll(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url);
  }

  // Actualizar y va al metodo actualizarusuario del springboot con putmapping
  // devuelve un usuario
  update(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(this.url, usuario);
  }
  


}
