import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarRol'
})
export class BuscarRolPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (args === '' ) return value;
    const resultPosts = [];
    for (const rol of value) {
      if (rol.nombre_rol.toLowerCase().indexOf(args.toLowerCase())  > -1) {
        resultPosts.push(rol);
      };
    };
    return resultPosts;
  }

}
