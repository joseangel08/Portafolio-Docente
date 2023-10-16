import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarPeriodoAcademico'
})
export class BuscarPeriodoAcademicoPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (args === '' ) return value;
    const resultPosts = [];
    for (const periodoAcademico of value) {
      if (periodoAcademico.descripcion.toLowerCase().indexOf(args.toLowerCase())  > -1) {
        resultPosts.push(periodoAcademico);
      };
      if(periodoAcademico.fecha_inicio.toLowerCase().indexOf(args.toLowerCase())  > -1){
        resultPosts.push(periodoAcademico);
      };
      if(periodoAcademico.estado.toLowerCase().indexOf(args.toLowerCase())  > -1){
        resultPosts.push(periodoAcademico);
      };
    };
    return resultPosts;
  }

}
