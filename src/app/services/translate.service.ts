import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  // Vble para cuando recojo la info este va a ser el objeto que traduzca
  private data: any;

  constructor(private http: HttpClient) { }

  /**
   * Obtengo las traducciones, depende del lenguaje del navegador, resolve es para cuando no hay error
   * reject es para cuando hay error
   */
  public getData() {
    // aqui me di cuenta que el navegador es es-419 y con eso cree el json
    //console.log(navigator.language)
    return new Promise((resolve, reject) => {
      this.http.get('assets/translations/' + navigator.language + '.json').subscribe(data => {
        this.data = data;     
        console.log(this.data)
        resolve(true);
      }, error => {
        console.error('Error al recuperar las traducciones: ' + error);
        reject(true);
      })
    })
  }

  /**
   * Obtengo una traduccion en concreto
   */
  public getTranslate(word: string){
    return this.data[word];
  }

}
