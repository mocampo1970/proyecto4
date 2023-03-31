import { Pipe, PipeTransform } from '@angular/core';

// Filter que sirve para filtrar los estudiantes por nombres
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // Value equivale a todas las categorias en este caso
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultEstudiantes = [];
    for (const estudiante of value) {
      if (estudiante.nombres.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultEstudiantes.push(estudiante);
      };
    };
    return resultEstudiantes;
  }  

}
