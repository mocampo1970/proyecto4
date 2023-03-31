// este pipe se debe ingresar en el app.module.ts en declarations
// Nos sirve para traducir

import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';


@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  // Este constructor en el pipe no estaba, se puede hacer, inyectar el servicio TranslateService y se import 
  // arriba
  // Uso al servicio de traduccion
  constructor(private translateService: TranslateService){}

  transform(value: any): any {
    // Traduzco la palabra pasada
    return this.translateService.getTranslate(value) ?  this.translateService.getTranslate(value) : '';
  }
}
