import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/users/user.roles';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}  // permite accder a la metadata

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean>{

    //* Obtener el "Rol" de la Ruta desde metadata:
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]); //* ['admin']

    //* Obtengo rol del usuario:
    const request = context.switchToHttp().getRequest();
    const user = request.user; //* = ['admin']

    //* Validar el Rol:
    const hasRole = () =>
      requiredRoles.some((role) => user?.roles?.includes(role));  
    
    console.log("user", user);
    console.log("********");    
    console.log("user roles", user.roles);
    console.log(requiredRoles);    
    console.log("hasrole", hasRole());

    const valid = user && user.roles && hasRole(); //* true || false
    if (!valid)
      throw new ForbiddenException(
        'No tiene permisos para acceder a esta ruta',
      );

    return valid;
  }
} 

// import {
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   Injectable,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Observable } from 'rxjs';
// import { Role } from 'src/users/user.roles';


// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}  // permite accder a la metadata

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean>{

//     //* Obtener el "Rol" de la Ruta desde metadata:
//     const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
//       context.getHandler(),
//       context.getClass(),
//     ]); 
//     console.log(requiredRoles);
    
//     //* Obtengo rol del usuario:
//     const request = context.switchToHttp().getRequest();
//     const user = request.user; //* = ['admin']
//     console.log("reques", user);
    
//     //* Validar el Rol:
//     const hasRole = () =>
//       requiredRoles.some((role) => user?.roles?.includes(role));     
//     console.log("mirol", hasRole());
    
      
//     const valid = user && user.roles && hasRole(); 
//     if (!valid)
//       throw new ForbiddenException(
//         'No tiene permisos para acceder a esta ruta',
//       );

//     return valid;
//   }
// } 
