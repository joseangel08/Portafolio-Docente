import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarUsuario'
})
export class BuscarUsuarioPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (args === '' ) return value;
    const resultPosts = [];
    for (const usuario of value) {
      /*if (usuario.cedula.toLowerCase().indexOf(args.toLowerCase())  > -1) {
        resultPosts.push(usuario);
      };*/
      if(usuario.nombre.toLowerCase().indexOf(args.toLowerCase())  > -1){
        resultPosts.push(usuario);
      };
      if(usuario.apellido.toLowerCase().indexOf(args.toLowerCase())  > -1){
        resultPosts.push(usuario);
      };
      if(usuario.correo.toLowerCase().indexOf(args.toLowerCase())  > -1){
        resultPosts.push(usuario);
      };
      if(usuario.carrera.toLowerCase().indexOf(args.toLowerCase())  > -1){
        resultPosts.push(usuario);
      };
    };
    return resultPosts;
  }

}
