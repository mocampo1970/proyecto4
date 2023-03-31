import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imagen } from '../models/imagen';

// video https://www.youtube.com/watch?v=MxZ7D7zv8Ao&list=PL4bT56Uw3S4xTuqOmdDc_GQbCvPh3aaZg&index=7
// va desde el 1 con todo el tema de cloudinary

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  // Vamos a darle la url que tiene el spring boot, vamos a la clase cloudiaryController 
  // y alli halamos cloudinary y como esa aplicacion corre en http://localhost:8080
  // simplemente juntamos al url + cloudinary y queda http://localhost:8080/cloudinary
  // o en el postman con las pruebas que hicimos http://localhost:8080/cloudinary
  // aqui mapeamos la URL del backend http://localhost:8080/cloudinary y alla en spring boot 
  // que es el backend mapeamos en cloudiaryController la de aqui http://localhost:4200
  // @CrossOrigin(origins = "http://localhost:4200")
  imagenUrl: string = "http://localhost:8080/cloudinary/";

  // Inyectamos el http
  constructor(private httpClient: HttpClient) { }

  // Obtener la lista, en el CloudinaryController apunta a la url + list
  public List(): Observable<Imagen[]>{
    return this.httpClient.get<Imagen[]>(this.imagenUrl + 'list');
  }

  // Cargar una imagen como esta en el spring boot
  public cargarImagen(id: number): Observable<any>{
    //return this.httpClient.get<Imagen>(this.imagenUrl + 'imagen/${id}');
    return this.httpClient.get<Imagen>(this.imagenUrl + 'list/${id}');
  }

  // Subir la imagen
  public upload(imagen: File): Observable<any>{
    // Los objetos FormData le permiten compilar un conjunto de pares clave/valor para enviar 
    // mediante XMLHttpRequest. Uno de los aspectos más importantes del desarrollo web son los formularios, 
    // ya que le permiten recopilar datos de los usuarios y cargarlos en los servidores.
    const formData = new FormData();
    formData.append('multipartFile', imagen);
    return this.httpClient.post<any>(this.imagenUrl + 'upload', formData);
  }

  // Eliminar apunta a la url + /delete/{id} e cloudinaryController, revisar las comillas
  // que hay dentro del delete son '' o son estas
  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.imagenUrl + 'delete/${id}');
  }


}
