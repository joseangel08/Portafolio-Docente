import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarPortafolioDocente'
})
export class BuscarPortafolioDocentePipePipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (args === '' ) return value;
    const resultPosts = [];
    for (const portafolioDocente of value) {
      if(portafolioDocente.nombre.toLowerCase().indexOf(args.toLowerCase())  > -1){
        resultPosts.push(portafolioDocente);
      };
      if(portafolioDocente.apellido.toLowerCase().indexOf(args.toLowerCase())  > -1){
        resultPosts.push(portafolioDocente);
      };
      if (portafolioDocente.descripcion_periodo.toLowerCase().indexOf(args.toLowerCase())  > -1) {
        resultPosts.push(portafolioDocente);
      };
    };
    return resultPosts;
  }
}
