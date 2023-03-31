import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cocheMarca'
})
export class CocheMarcaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultCoches = [];

    console.log("dentro del transform");

    for (const coche of value) {
      console.log("cochemarca.pipe" , coche)
      // ste es el original
      if (coche.marca.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        console.log("entro a for y if cochemarca")
        resultCoches.push(coche);
      };
    };
    return resultCoches;
  }

}
