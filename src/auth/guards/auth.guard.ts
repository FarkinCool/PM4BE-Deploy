import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Role } from 'src/users/user.roles';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest(); // contexto d ejecucion (datos del header)
    
    const token = request.headers.authorization?.split(' ')[1];
    if(!token) throw new UnauthorizedException('token does not exist');

    try {
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, {secret});
      if(!user) throw new UnauthorizedException("error for valid to token");
      user.exp = new Date(user.exp *1000);
      user.roles = user.roles  ? [Role.Admin] : [Role.User];

      // ruta para acceder orders por el token
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException("error for valid to token");
    }
  }
}
