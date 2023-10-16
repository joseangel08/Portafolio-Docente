import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarActividadDocente'
})
export class BuscarActividadDocentePipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (args === '' ) return value;
    const resultPosts = [];
    for (const actividadDocente of value) {
      if (actividadDocente.codigo.toLowerCase().indexOf(args.toLowerCase())  > -1) {
        resultPosts.push(actividadDocente);
      };
      if(actividadDocente.descripcion.toLowerCase().indexOf(args.toLowerCase())  > -1){
        resultPosts.push(actividadDocente);
      };
      if(actividadDocente.estado.toLowerCase().indexOf(args.toLowerCase())  > -1){
        resultPosts.push(actividadDocente);
      };
    };
    return resultPosts;
  }


}
