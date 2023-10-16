import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarCarrera'
})
export class BuscarCarreraPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (args === '' ) return value;
    const resultPosts = [];
    for (const carrera of value) {
      if (carrera.nombre.toLowerCase().indexOf(args.toLowerCase())  > -1) {
        resultPosts.push(carrera);
      };
      if(carrera.descripcion.toLowerCase().indexOf(args.toLowerCase())  > -1){
        resultPosts.push(carrera);
      };
      if(carrera.estado.toLowerCase().indexOf(args.toLowerCase())  > -1){
        resultPosts.push(carrera);
      };
    };
    return resultPosts;
  }

}
